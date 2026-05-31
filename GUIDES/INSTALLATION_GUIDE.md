# 📦 Complete Installation & Deployment Guide
## Trading Walla AI — Production Ready

---

## 🔧 Prerequisites

### Required Software
- **Node.js 18+** (for frontend)
- **Python 3.11+** (for backend)
- **Git** (for version control)
- **npm or yarn** (for package management)
- **Docker** (optional, for containerization)
- **PostgreSQL 14+** (for production database)

### System Requirements
- **RAM:** Minimum 4GB (8GB recommended)
- **Storage:** 10GB minimum
- **Internet:** 5Mbps+ for cloud deployment

---

## Part 1: Local Development Setup

### Step 1.1: Clone/Download Project
```bash
# Navigate to your projects folder
cd ~/projects

# Clone the repository (or download as ZIP)
git clone https://github.com/yourusername/trading-walla-ai.git
cd trading-walla-ai

# Or if downloaded as ZIP
unzip trading-walla-ai.zip
cd trading-walla-ai
```

### Step 1.2: Backend Setup
```bash
# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Create .env file for development
cat > .env << EOF
DATABASE_URL=sqlite:///./trading.db
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your-secret-key-here
JWT_SECRET=your-jwt-secret-here
EOF

# Run migrations (if any)
# python -m alembic upgrade head

# Start backend server
python main.py
# Should see: "Uvicorn running on http://0.0.0.0:8000"
```

### Step 1.3: Frontend Setup
```bash
# Open new terminal window
cd frontend

# Install dependencies
npm install

# Create .env file for development
cat > .env << EOF
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
EOF

# Start development server
npm run dev
# Should see: "ready in XXX ms"
# Visit: http://localhost:5173
```

### Step 1.4: Verify Installation
```bash
# Backend health check
curl http://localhost:8000/api/health
# Expected: {"status": "healthy", "timestamp": "..."}

# Frontend should load at http://localhost:5173
# Login with demo@trading.in / demo123
```

---

## Part 2: Production Deployment

### Step 2.1: Production Database Setup

#### PostgreSQL (Recommended)
```bash
# On macOS (via Homebrew)
brew install postgresql
brew services start postgresql

# On Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Create database
sudo -u postgres createdb trading_walla_ai
sudo -u postgres createuser trading_user
sudo -u postgres psql -c "ALTER USER trading_user WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE trading_walla_ai TO trading_user;"

# Verify
psql -U trading_user -d trading_walla_ai
```

### Step 2.2: Backend Production Build
```bash
cd backend

# Update .env for production
cat > .env.production << EOF
DATABASE_URL=postgresql://trading_user:secure_password@localhost:5432/trading_walla_ai
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_production_secret
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your-production-secret-key
JWT_SECRET=your-production-jwt-secret
ENVIRONMENT=production
DEBUG=false
EOF

# Install production dependencies
pip install gunicorn

# Run database migrations
# python -m alembic upgrade head

# Start with Gunicorn (production ASGI server)
gunicorn main:app -w 4 -b 0.0.0.0:8000 --access-logfile - --error-logfile -
```

### Step 2.3: Frontend Production Build
```bash
cd frontend

# Update .env for production
cat > .env.production << EOF
VITE_API_URL=https://api.tradingwalla.com
VITE_WS_URL=wss://api.tradingwalla.com
EOF

# Build optimized bundle
npm run build
# Output: dist/ folder (~200KB gzipped)

# Verify build
npm run preview
# Test at http://localhost:4173
```

### Step 2.4: Nginx Configuration
```bash
# Create Nginx config
sudo cat > /etc/nginx/sites-available/trading-walla << 'EOF'
upstream trading_backend {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name tradingwalla.com www.tradingwalla.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tradingwalla.com www.tradingwalla.com;
    
    # SSL certificates (via Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/tradingwalla.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tradingwalla.com/privkey.pem;
    
    # Frontend
    location / {
        root /var/www/trading-walla/frontend/dist;
        try_files $uri /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://trading_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket
    location /ws/ {
        proxy_pass http://trading_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/trading-walla /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 2.5: SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d tradingwalla.com -d www.tradingwalla.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Step 2.6: System Service Setup (Systemd)
```bash
# Backend service
sudo cat > /etc/systemd/system/trading-walla-backend.service << 'EOF'
[Unit]
Description=Trading Walla AI Backend
After=network.target postgresql.service

[Service]
Type=notify
User=trading
WorkingDirectory=/home/trading/trading-walla-ai/backend
Environment="PATH=/home/trading/trading-walla-ai/venv/bin"
ExecStart=/home/trading/trading-walla-ai/venv/bin/gunicorn main:app -w 4 -b 127.0.0.1:8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable trading-walla-backend
sudo systemctl start trading-walla-backend
sudo systemctl status trading-walla-backend
```

---

## Part 3: Docker Deployment

### Step 3.1: Docker Setup
```bash
# Verify Docker installation
docker --version
docker-compose --version

# Build images
docker-compose build

# Start containers
docker-compose up -d

# Verify services
docker-compose ps
# Should show: trading-walla-postgres, trading-walla-redis, trading-walla-api, trading-walla-frontend

# View logs
docker-compose logs -f trading-walla-api
```

### Step 3.2: Docker Compose File
```yaml
# docker-compose.yml (already created in project root)
# Uses production configurations
# Includes: PostgreSQL, Redis, FastAPI, React
```

### Step 3.3: Cloud Deployment (AWS, Google Cloud, etc.)
```bash
# Push to Docker Hub
docker login
docker tag trading-walla-api:latest yourusername/trading-walla-api:latest
docker push yourusername/trading-walla-api:latest

# Deploy to AWS ECS
aws ecs create-service --cluster trading-walla --service-name api --task-definition trading-walla-api

# Or deploy to Google Cloud Run
gcloud run deploy trading-walla-api --image gcr.io/your-project/trading-walla-api --platform managed
```

---

## Part 4: Web Application Deployment

### Step 4.1: Hosting Options

#### Option A: AWS
```bash
# EC2 Instance
# 1. Create Ubuntu 22.04 LTS instance (t3.medium)
# 2. SSH into instance
# 3. Follow Step 2.1-2.6 above

# RDS Database
aws rds create-db-instance --db-instance-identifier trading-walla-db \
  --db-instance-class db.t3.micro --engine postgres --master-username admin \
  --master-user-password secure_password --allocated-storage 20

# CloudFront CDN
# 1. Create CloudFront distribution
# 2. Point to S3 bucket (for frontend)
# 3. Point to ALB (for backend)

# S3 Frontend Hosting
aws s3 cp frontend/dist s3://trading-walla-assets --recursive
```

#### Option B: Google Cloud
```bash
# Cloud Run (Serverless)
gcloud run deploy trading-walla \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Cloud SQL (Database)
gcloud sql instances create trading-walla-db \
  --database-version POSTGRES_14 \
  --tier db-f1-micro

# Cloud Storage (Frontend)
gsutil -m cp -r frontend/dist/* gs://trading-walla-assets/
```

#### Option C: DigitalOcean
```bash
# App Platform (PaaS)
# 1. Create account at digitalocean.com
# 2. Connect GitHub repository
# 3. Select Build & Deploy
# 4. Automatic deployment on push

# Database (Managed PostgreSQL)
# 1. Create PostgreSQL cluster
# 2. Update connection string in .env
# 3. Automatic backups enabled

# Spaces (S3-compatible storage)
# 1. Create Space for static assets
# 2. Configure CDN
```

#### Option D: Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod

# Set environment variables
vercel env add VITE_API_URL

# Auto-deploy on git push
# (configure in Vercel dashboard)
```

### Step 4.2: Domain & DNS Setup
```bash
# Buy domain (Godaddy, Namecheap, Route53, etc.)

# Point to your server
# Type: A
# Name: @
# Value: your-server-ip

# Subdomain for API
# Type: A
# Name: api
# Value: your-api-server-ip

# Or use CNAME for CDN
# Type: CNAME
# Name: www
# Value: d123.cloudfront.net
```

### Step 4.3: Email Configuration
```bash
# SendGrid (for transactional emails)
# 1. Create SendGrid account
# 2. Create API key
# 3. Add to backend .env:
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@tradingwalla.com

# Update backend for email notifications
```

### Step 4.4: Monitoring & Logging
```bash
# Sentry (Error tracking)
pip install sentry-sdk
# Add to backend/main.py
import sentry_sdk
sentry_sdk.init("https://xxxxx@sentry.io/123456")

# DataDog (Monitoring)
# 1. Create DataDog account
# 2. Install agent
# 3. Monitor CPU, memory, requests

# CloudWatch (AWS)
# Already integrated if using AWS
```

---

## Part 5: Mobile App Deployment

### Step 5.1: Build React Native App
```bash
# Install React Native CLI
npm install -g rnpm
npm install -g @react-native-community/cli

# Create React Native project
npx react-native init TradingWallaAI

# Copy frontend components (with React Native compatibility)
cp frontend/src/components/Card.tsx app/components/
cp frontend/src/pages/Dashboard.tsx app/screens/

# Install dependencies
npm install react-navigation react-native-screens react-native-safe-area-context

# Update API client for WebSocket
npm install react-native-websocket
```

### Step 5.2: iOS App Store Deployment

#### Prerequisites
- Mac with Xcode
- Apple Developer Account ($99/year)
- iOS 14+

#### Step-by-Step Process
```bash
# 1. Generate iOS bundle
cd mobile
npm run build:ios

# 2. Open Xcode
open ios/TradingWallaAI.xcworkspace

# 3. Configure signing
# - Select Team ID
# - Set Bundle Identifier: com.tradingwalla.app
# - Enable automatic signing

# 4. Create Archive
# - Product → Archive
# - Wait for build complete

# 5. Upload to App Store Connect
# - Window → Organizer
# - Select Archive → Distribute App

# 6. Create App Store listing
# - Go to appstoreconnect.apple.com
# - Create new app
# - Fill metadata:
#   - App name: Trading Walla AI
#   - Category: Finance
#   - Rating: All ages
#   - Description: Premium market intelligence platform
#   - Screenshots: 5+ device types
#   - Keywords: trading, options, stocks, portfolio
#   - Support URL: https://tradingwalla.com/support
#   - Privacy Policy: https://tradingwalla.com/privacy

# 7. Pricing & Availability
# - Free app
# - Available in all regions

# 8. Submit for Review
# - Click "Submit for Review"
# - Add release notes: "v1.0.0 - Initial release"
# - Apple reviews in 24-48 hours

# 9. Monitor status
# - Check appstoreconnect.apple.com regularly
# - Respond to any reviewer questions
```

**Apple Review Guidelines:**
- No fake data
- Real functionality
- Clear value proposition
- Professional screenshots
- No excessive ads
- Privacy policy required

### Step 5.3: Google Play Store Deployment

#### Prerequisites
- Google Play Developer Account ($25 one-time)
- Android 8+ APK

#### Step-by-Step Process
```bash
# 1. Generate Android bundle
npm run build:android

# 2. Create keystore
keytool -genkey -v -keystore trading-walla-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias trading-walla

# 3. Sign APK
jarsigner -verbose -sigalg MD5withRSA -digestalg SHA1 \
  -keystore trading-walla-key.jks \
  app-release-unsigned.apk trading-walla

# 4. Zipalign
zipalign -v 4 app-release-unsigned.apk app-release.apk

# 5. Create Google Play listing
# - Go to play.google.com/console
# - Create new app
# - Fill metadata:
#   - App name: Trading Walla AI
#   - Category: Finance
#   - Short description: (80 chars max)
#   - Full description: (4000 chars max)
#   - Contact email: support@tradingwalla.com
#   - Privacy policy URL
#   - Screenshots: 2-8 per device

# 6. Upload APK/AAB
# - Release → Production
# - Upload app bundle (.aab)
# - Add release notes

# 7. Set pricing
# - Free tier
# - In-app purchases (subscriptions)
# - All countries

# 8. Submit for Review
# - Content rating questionnaire
# - Review policy compliance
# - Submit app
# - Google reviews in 1-3 hours (usually same day)

# 9. Monitor metrics
# - Installs, crashes, reviews
# - Update rating
# - Monitor reviews and respond
```

**Google Play Review Guidelines:**
- Real user value
- No malware
- Legitimate functionality
- Clear privacy policy
- Appropriate content rating
- Responsive to user issues

---

## Part 6: Production Monitoring

### Step 6.1: Health Checks
```bash
# Backend health
curl https://api.tradingwalla.com/api/health

# Database connection
curl https://api.tradingwalla.com/api/db-health

# Frontend status
curl https://tradingwalla.com

# WebSocket connectivity
wscat -c wss://api.tradingwalla.com/ws/SBIN
```

### Step 6.2: Logging
```bash
# View application logs
journalctl -u trading-walla-backend -f

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Docker logs
docker-compose logs -f trading-walla-api
```

### Step 6.3: Performance Monitoring
```bash
# CPU & Memory
top
htop

# Disk usage
df -h

# Network
netstat -an | grep ESTABLISHED | wc -l

# Database performance
# Connect to PostgreSQL and run:
SELECT * FROM pg_stat_statements;
```

---

## Part 7: Backup & Disaster Recovery

### Step 7.1: Database Backup
```bash
# Daily PostgreSQL backup
mysqldump -u trading_user -p trading_walla_ai > backup-$(date +%Y%m%d).sql

# Upload to S3
aws s3 cp backup-*.sql s3://trading-walla-backups/

# Automated backup script
cat > /home/trading/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U trading_user trading_walla_ai > $BACKUP_DIR/backup_$DATE.sql
gzip $BACKUP_DIR/backup_$DATE.sql
aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://trading-walla-backups/
find $BACKUP_DIR -mtime +30 -delete
EOF

# Schedule with cron (daily at 2 AM)
0 2 * * * /home/trading/backup.sh
```

### Step 7.2: Restore from Backup
```bash
# Download backup
aws s3 cp s3://trading-walla-backups/backup_20240115_020000.sql.gz .

# Decompress
gunzip backup_20240115_020000.sql.gz

# Restore
psql -U trading_user trading_walla_ai < backup_20240115_020000.sql
```

---

## Part 8: Security Hardening

### Step 8.1: Firewall Setup
```bash
# Ubuntu firewall
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable

# Check rules
sudo ufw status
```

### Step 8.2: Security Headers
```nginx
# Add to Nginx config
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

### Step 8.3: Rate Limiting
```bash
# Nginx rate limiting
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req zone=api_limit burst=20 nodelay;
```

---

## Part 9: Scaling for Production

### Horizontal Scaling
```bash
# Run multiple backend instances
# Use load balancer (Nginx, HAProxy, AWS ALB)
upstream trading_backend {
    server backend1.internal:8000;
    server backend2.internal:8000;
    server backend3.internal:8000;
}
```

### Caching Layer
```bash
# Redis configuration
# Store: user sessions, quotes cache, watchlist data
# TTL: 5 minutes for quotes, 30 days for user data

# Backend integration
from redis import Redis
cache = Redis(host='localhost', port=6379, db=0)
cache.setex('quote:SBIN', 300, json.dumps(quote_data))
```

### Database Optimization
```sql
-- Create indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_subscription_user ON subscriptions(user_id);
CREATE INDEX idx_payment_user ON payments(user_id);
CREATE INDEX idx_alert_user ON alerts(user_id);

-- Analyze
ANALYZE;

-- Vacuum
VACUUM ANALYZE;
```

---

## Part 10: Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>
```

#### Database Connection Failed
```bash
# Check PostgreSQL service
sudo systemctl status postgresql

# Verify credentials
psql -U trading_user -d trading_walla_ai -h localhost

# Check .env DATABASE_URL
echo $DATABASE_URL
```

#### Frontend Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+

# Try build again
npm run build
```

#### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Check expiration
sudo certbot certificates

# Manual renewal
sudo certbot certonly --nginx -d tradingwalla.com --force-renewal
```

---

## Checklist: Launch Ready

- [ ] Domain registered and DNS configured
- [ ] SSL certificate installed (HTTPS)
- [ ] Backend running with production database
- [ ] Frontend built and deployed
- [ ] Email notifications configured
- [ ] Razorpay keys set up
- [ ] Backup system automated
- [ ] Monitoring & logging active
- [ ] iOS app submitted to App Store
- [ ] Android app submitted to Google Play
- [ ] Support email operational
- [ ] Privacy policy & Terms updated
- [ ] Feedback system in place
- [ ] Analytics enabled
- [ ] Performance baseline established

---

## Post-Launch Monitoring

```bash
# Daily checklist
1. Check error logs for exceptions
2. Monitor payment success rate (target: >95%)
3. Review user feedback
4. Monitor server resource usage
5. Verify backups completed
6. Check app store reviews

# Weekly checklist
1. Performance optimization
2. Security updates
3. Database maintenance
4. User growth metrics
5. Revenue report
```

---

**All done!** Your Trading Walla AI platform is production-ready. 🚀

For support: support@tradingwalla.com

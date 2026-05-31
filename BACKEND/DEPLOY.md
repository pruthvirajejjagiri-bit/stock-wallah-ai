# Google Cloud Run Deployment Guide

## Prerequisites
- Google Cloud account with ₹20K credit (already set up)
- gcloud CLI installed
- Git with backend code pushed to GitHub

## Deployment Steps

### Step 1: Install gcloud CLI
Download from: https://cloud.google.com/sdk/docs/install

### Step 2: Login to Google Cloud
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Step 3: Set Environment Variables
Create `.env` file in backend folder:
```
NODE_ENV=production
PORT=8080
CLAUDE_API_KEY=sk-xxxxx
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_key_here
JWT_SECRET=your_secret_here
```

### Step 4: Deploy to Cloud Run
```bash
cd backend

gcloud run deploy stock-wallah-api \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,CLAUDE_API_KEY=sk-xxxxx,SUPABASE_URL=https://xxxxx.supabase.co,SUPABASE_KEY=your_key
```

### Step 5: Get Service URL
After deployment, you'll get a URL like:
```
https://stock-wallah-api-xxxxx-asia-south1.a.run.app
```

### Step 6: Test API
```bash
curl https://stock-wallah-api-xxxxx-asia-south1.a.run.app/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2026-06-01T...",
  "service": "Stock Wallah AI Backend"
}
```

## Troubleshooting
- Check logs: `gcloud run logs read stock-wallah-api`
- View services: `gcloud run services list`
- Update: Re-run deploy command
- Delete: `gcloud run services delete stock-wallah-api`

## Cost
- Free tier: 2M requests/month
- ₹20K credit covers ~10M requests
- Monitor at: https://console.cloud.google.com/billing

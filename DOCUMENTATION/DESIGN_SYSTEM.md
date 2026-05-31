# Stock Wallah AI — Premium Design System

**$100B-Level UI/UX — World-Class Visual Design**

---

## 🎨 DESIGN PHILOSOPHY

**Premium. Trustworthy. Modern. Professional.**

We're building a platform that looks as good as Bloomberg Terminal meets Apple Design meets Figma.

- **Minimalist brutalism** — Every pixel purposeful
- **Institutional trust** — Professional + approachable
- **Premium dark mode** — Luxury trading aesthetic
- **Accessible excellence** — Beautiful AND usable

---

## 🎨 COLOR SYSTEM

### **Primary Palette**

```
Primary Green (Growth): #00D4A8
  Light shade:         #1EDDB8
  Dark shade:          #00B894
  
Primary Blue (Trust):  #2563EB
  Light shade:         #3B82F6
  Dark shade:          #1D4ED8
  
Accent Gold:           #FFC32A
  Light shade:         #FFD454
  Dark shade:          #F4A82A
  
Danger Red:            #FF5A66
  Light shade:         #FF7A8A
  Dark shade:          #E63946
```

### **Neutrals (Premium Dark)**

```
Background Primary:    #0A0E27 (Deep navy - premium feel)
Background Secondary:  #111328 (Slightly lighter)
Surface Primary:       #181B33 (Card background)
Surface Secondary:     #1F2340 (Elevated surface)

Border:               rgba(255,255,255,0.10) (Subtle)
Border Hover:         rgba(255,255,255,0.20) (Emphasized)

Text Primary:         #FFFFFF (Pure white)
Text Secondary:       rgba(255,255,255,0.62) (Muted)
Text Tertiary:        rgba(255,255,255,0.35) (Faint)
```

### **Theme Example: Light Mode**

```
Background Primary:    #F9FAFB (Almost white)
Background Secondary:  #FFFFFF (Pure white)
Surface Primary:       #FFFFFF
Surface Secondary:     #F3F4F6

Border:               rgba(0,0,0,0.08)
Text Primary:         #111827 (Very dark)
Text Secondary:       #6B7280 (Gray)
```

### **Theme Example: Ocean**

```
Background Primary:    #051525 (Deep ocean)
Background Secondary:  #071E32
Surface Primary:       #0A2840
Surface Secondary:     #0E3250

Primary Color:        #00E5B4 (Turquoise)
Accent:               #00CCFF (Cyan)
Text:                 #E8F4FF (Light blue-white)
```

---

## 📐 TYPOGRAPHY SYSTEM

### **Font Family**
- **Primary:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Monospace:** 'Roboto Mono', 'Courier New', monospace

### **Heading Hierarchy**

```
H1: 32px / 1.2 / 700 (Bold)
   Letter-spacing: -0.02em
   Line-height: 38px
   Use for: Page titles, major sections

H2: 24px / 1.3 / 700 (Bold)
   Letter-spacing: -0.01em
   Line-height: 32px
   Use for: Section headers

H3: 18px / 1.3 / 600 (Semi-bold)
   Letter-spacing: 0
   Line-height: 24px
   Use for: Card titles, subsections

H4: 14px / 1.4 / 600 (Semi-bold)
   Use for: Labels, prominent text

Body Large: 16px / 1.5 / 400
   Use for: Primary content, descriptions

Body Regular: 14px / 1.5 / 400
   Use for: Secondary content

Small: 12px / 1.4 / 400
   Use for: Captions, helper text

Tiny: 11px / 1.4 / 500
   Use for: Badges, tags
```

### **Typography Examples**

```
Headline: "Stock Wallah AI"
  → 32px Bold, -0.02em spacing, letter-spaced modern

Card Title: "Market Mood"
  → 18px Semi-bold, clean and professional

Value: "23,547.75"
  → 28px Bold, monospace (for numbers)

Label: "NIFTY 50"
  → 11px Bold, 1px letter-spacing, uppercase (premium feel)
```

---

## 🎯 COMPONENT DESIGN

### **Button System**

#### **Primary Button**
```jsx
<button style={{
  background: 'linear-gradient(135deg, #00D4A8 0%, #00B894 100%)',
  color: '#0A0E27',
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 600,
  fontSize: '14px',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0, 212, 168, 0.3)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
}}>
  Get Started
</button>
```

**Hover State:**
- Scale: 1.02
- Box-shadow: 0 6px 20px rgba(0, 212, 168, 0.4)
- Brightness: 110%

#### **Secondary Button**
```jsx
<button style={{
  background: 'transparent',
  color: '#00D4A8',
  padding: '12px 24px',
  borderRadius: '8px',
  border: '2px solid rgba(0, 212, 168, 0.3)',
  fontWeight: 600,
  fontSize: '14px',
}}>
  Learn More
</button>
```

#### **Danger Button**
```jsx
<button style={{
  background: '#FF5A66',
  color: '#FFFFFF',
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 600,
}}>
  Delete Account
</button>
```

### **Card Design**

#### **Premium Card**
```jsx
<div style={{
  background: '#181B33',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}}>
  {/* Content */}
</div>
```

**Hover Effect:**
- Border-color: rgba(0, 212, 168, 0.3)
- Box-shadow: 0 25px 40px rgba(0, 212, 168, 0.15)
- Transform: translateY(-2px)

### **Input Fields**

#### **Premium Text Input**
```jsx
<input style={{
  background: '#111328',
  color: '#FFFFFF',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '14px 16px',
  fontSize: '14px',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
}} 
placeholder="Enter email address"
onFocus={(e) => {
  e.target.style.borderColor = 'rgba(0, 212, 168, 0.5)';
  e.target.style.boxShadow = '0 0 0 3px rgba(0, 212, 168, 0.1)';
}}
/>
```

**Focus State:**
- Border: 2px solid #00D4A8
- Box-shadow: 0 0 0 3px rgba(0, 212, 168, 0.1)
- Background: #1F2340 (slightly lighter)

### **Badge & Tag System**

#### **Success Badge**
```jsx
<span style={{
  background: 'rgba(0, 212, 168, 0.15)',
  color: '#00D4A8',
  padding: '4px 12px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.5px',
}}>
  ✓ Active
</span>
```

#### **Premium Tag**
```jsx
<span style={{
  background: 'rgba(255, 195, 42, 0.1)',
  color: '#FFC32A',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 600,
  border: '1px solid rgba(255, 195, 42, 0.2)',
}}>
  PRO
</span>
```

---

## 🎨 LAYOUT DESIGN

### **Premium Dashboard Header**

```
┌─────────────────────────────────────────────────────────┐
│ [SW Logo]  Stock Wallah AI                [🔔] [PRO]   │
│            Market seekhne ka smart tareeka             │
└─────────────────────────────────────────────────────────┘

Features:
- Logo: 34×34 rounded square with gradient
- Clean typography with tagline
- Icons right-aligned
- Subtle bottom border (gradient fade)
- 16px padding all sides
- Semi-transparent backdrop blur effect
```

### **Card Grid Layout**

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  NIFTY 50    │  │  SENSEX      │  │ BANK NIFTY   │
│  23,547.75   │  │  74,775.74   │  │  51,832.60   │
│  ↑ 1.50%     │  │  ↓ 1.44%     │  │  ↓ 0.42%     │
└──────────────┘  └──────────────┘  └──────────────┘
```

**Card Specs:**
- Width: ~33% (responsive)
- Height: 140px
- Border-radius: 16px
- Padding: 16px
- Gap: 12px
- Background: Gradient overlay on dark
- Border: Subtle 1px, lighter on hover

---

## 🌈 VISUAL EXAMPLES

### **Screen 1: Login Page**

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                                                              ║
║                       [SW Logo]                             ║
║                   Stock Wallah AI                           ║
║            Market seekhne ka smart tareeka                  ║
║                                                              ║
║  ┌────────────────────────────────────────────────────────┐ ║
║  │  Create Your Account                                   │ ║
║  │                                                         │ ║
║  │  [Email Address Input]                                 │ ║
║  │  [Mobile Number Input]                                 │ ║
║  │  [Full Name Input]                                     │ ║
║  │                                                         │ ║
║  │  [Select Language ▼] (12 options)                      │ ║
║  │                                                         │ ║
║  │  [ Continue Button - Green Gradient ]                  │ ║
║  │                                                         │ ║
║  │  Secure account protected by Supabase                  │ ║
║  └────────────────────────────────────────────────────────┘ ║
║                                                              ║
║  For education and virtual practice only                    ║
║  We never provide investment advice or guaranteed profits   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Colors:
- Background: Deep navy #0A0E27
- Card: Dark blue #181B33 with subtle border
- Button: Gradient green (#00D4A8 → #00B894)
- Text: Clean white with proper hierarchy
- Accents: Subtle green glows on hover
```

### **Screen 2: Dashboard**

```
╔══════════════════════════════════════════════════════════════╗
║ [Logo] Stock Wallah AI              [🔔] [PRO Badge]        ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🔴 LIVE  NSE market data & insights                       ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ MARKET MOOD                              72/100 ✓    │  ║
║  │ Learning Mode                                         │  ║
║  │ AI explains market movement in your language          │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
║  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ ║
║  │ NIFTY 50        │  │ SENSEX          │  │ BANK NIFTY  │ ║
║  │ 23,547.75       │  │ 74,775.74       │  │ 51,832.60   │ ║
║  │ ↑ 1.50%         │  │ ↓ 1.44%         │  │ ↓ 0.42%     │ ║
║  └─────────────────┘  └─────────────────┘  └─────────────┘ ║
║                                                              ║
║  FIN NIFTY | INDIA VIX                                      ║
║  [Charts and more data]                                     ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ Today's Learning Path                                │  ║
║  │ • Stock kya hota hai?                    +20 XP      │  ║
║  │ • Nifty aur Sensex kya hai?              +20 XP      │  ║
║  │ • Stop-loss kya hota hai?                +25 XP      │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ Unlock Stock Wallah AI PRO                           │  ║
║  │ Paper trading, TradingView charts, AI scanner...      │  ║
║  │ ₹0 today. ₹199/month after 7-day trial.             │  ║
║  │ [ Start Free Trial ]                                 │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║ [Home] [Charts] [AI] [Paper] [School] [PRO] [Profile]       ║
╚══════════════════════════════════════════════════════════════╝
```

### **Screen 3: Charts Page**

```
╔══════════════════════════════════════════════════════════════╗
║ [Logo] Stock Wallah AI                    [PRO]             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  NIFTY 50 Charts                                            ║
║                                                              ║
║  [Stock Wallah Chart] [TradingView+]                        ║
║  [1m] [5m] [15m] [1D] [1W] [1M]                            ║
║  [EMA] [RSI] [MACD] [Bollinger Bands] [Volume]             ║
║                                                              ║
║  ╔════════════════════════════════════════════════════════╗ ║
║  ║                                                        ║ ║
║  ║                                                        ║ ║
║  ║                   [Chart Area]                         ║ ║
║  ║             (Beautiful candlestick)                    ║ ║
║  ║                                                        ║ ║
║  ║                                                        ║ ║
║  ║                                                        ║ ║
║  ║                                                        ║ ║
║  ║                                                        ║ ║
║  ╚════════════════════════════════════════════════════════╝ ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ Stock Wallah AI: Trend Strength | Sentiment          │  ║
║  │                                                       │  ║
║  │ Trend Strength: Strong Uptrend ✓                      │  ║
║  │ Market Breadth: 65% gainers                           │  ║
║  │ OI & PCR: Call OI dominant, PCR at 0.95               │  ║
║  │ Technical: RSI at 68 (Strong), MACD Positive          │  ║
║  │ Key Levels: Support at 23,400 | Resistance 23,600    │  ║
║  │ Pattern: Higher highs, higher lows (Bullish)          │  ║
║  │                                                       │  ║
║  │ This is an educational analysis only, not advice      │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║ [Home] [Charts] [AI] [Paper] [School] [PRO] [Profile]       ║
╚══════════════════════════════════════════════════════════════╝
```

### **Screen 4: Paper Trading**

```
╔══════════════════════════════════════════════════════════════╗
║ [Logo] Stock Wallah AI                    [PRO]             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Paper Trading                                              ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ VIRTUAL BALANCE                                      │  ║
║  │ ₹10,00,000                                           │  ║
║  │ Available Cash: ₹9,50,000                            │  ║
║  │ Virtual money only. No real money is used.           │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ Place Virtual Order                                  │  ║
║  │                                                      │  ║
║  │ Symbol: [NIFTY 50            ▼]                      │  ║
║  │ Side:   [BUY / SELL]                                 │  ║
║  │ Quantity: [100              ]                        │  ║
║  │ Price:    [23,547.75        ]                        │  ║
║  │ Stop Loss: [23,400          ]                        │  ║
║  │ Target:    [23,700          ]                        │  ║
║  │                                                      │  ║
║  │ [BUY Button Green] [SELL Button Red]                │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
║  Open Positions:                                            ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ SBIN | 100 @ ₹745.50 | Current: ₹748.20 | +₹270    │  ║
║  │ INFY |  50 @ ₹1920   | Current: ₹1935   | +₹750    │  ║
║  │ RELIANCE | 25 @ ₹2850.50 | Current: ₹2934.50 | +₹2,100 │
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
║  Total P&L: +₹3,120 (+0.31%)                                ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║ [Home] [Charts] [AI] [Paper] [School] [PRO] [Profile]       ║
╚══════════════════════════════════════════════════════════════╝
```

### **Screen 5: AI Features**

```
╔══════════════════════════════════════════════════════════════╗
║ [Logo] Stock Wallah AI                    [PRO]             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Stock Wallah AI Assistant                                  ║
║  Ask in English, Hinglish, Hindi, or regional languages     ║
║                                                              ║
║  Quick Chips:                                               ║
║  [ NIFTY kya hai? ] [ Stop-loss kya hota hai? ]             ║
║  [ PCR kaise samjhein? ] [ Chart ka trend explain karo ]    ║
║  [ F&O risk kya hai? ]                                      ║
║                                                              ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │ [Chat Area]                                          │  ║
║  │                                                      │  ║
║  │ User: "NIFTY ke liye best strategy kya hai?"        │  ║
║  │                                                      │  ║
║  │ AI: Stock Wallah AI educational view:               │  ║
║  │ Market direction depends on trend, volume,          │  ║
║  │ support/resistance, and sentiment. Check risk       │  ║
║  │ before any real decision. This is learning only,    │  ║
║  │ not investment advice.                              │  ║
║  │                                                      │  ║
║  │ [Translate Button]                                  │  ║
║  │                                                      │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                              ║
║  AI Chart Scanner (PRO)                                     ║
║  Upload chart screenshot/photo and get educational         ║
║  analysis with trend, patterns, key levels, and risks.      ║
║                                                              ║
║  [📸 Upload Screenshot] [📷 Take Photo]                     ║
║                                                              ║
║  Disclaimer: AI analysis may be inaccurate and is not       ║
║  investment advice.                                         ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║ [Home] [Charts] [AI] [Paper] [School] [PRO] [Profile]       ║
╚══════════════════════════════════════════════════════════════╝
```

---

## ✨ PREMIUM EFFECTS

### **Micro-interactions**

```css
/* Smooth hover on cards */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 25px 40px rgba(0, 212, 168, 0.15);
  border-color: rgba(0, 212, 168, 0.3);
}

/* Button press effect */
button:active {
  transform: scale(0.98);
}

/* Input focus glow */
input:focus {
  box-shadow: 0 0 0 3px rgba(0, 212, 168, 0.1);
}

/* Loading animation */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.loading {
  animation: shimmer 2s infinite;
}

/* Number change animation */
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.number-change {
  animation: slideIn 0.3s ease-out;
}
```

### **Glass Morphism**

```css
.glass {
  background: rgba(24, 27, 51, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

### **Gradient Overlays**

```css
.gradient-header {
  background: linear-gradient(135deg, 
    #00D4A8 0%, 
    #2563EB 50%, 
    #7167D8 100%);
}

.gradient-text {
  background: linear-gradient(135deg, #00D4A8, #FFC32A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 🎯 PREMIUM SPACING

### **Spacing Scale**

```
4px   - Minimal gaps
8px   - Tiny spacing
12px  - Small gaps
16px  - Card padding, component spacing
20px  - Section padding
24px  - Card padding (larger)
32px  - Major sections
48px  - Page sections
64px  - Large gaps
```

### **Padding Examples**

```
Buttons:     12px 24px (vertical × horizontal)
Cards:       20px / 24px
Inputs:      14px 16px
Badges:      4px 12px
Sections:    32px (top & bottom)
```

---

## 🎨 DARK MODE SUPERIORITY

**Why dark mode for premium feel:**

✅ **Reduced eye strain** — Luxury = comfort  
✅ **OLED efficiency** — Battery-conscious = premium  
✅ **Focused attention** — Less distraction = elite  
✅ **Modern aesthetic** — Bloomberg, Apple, Netflix all use it  
✅ **Premium colors pop** — Greens & golds shine on dark  
✅ **Trust signal** — Professional financial platforms use dark  

---

## 📐 RESPONSIVE DESIGN

### **Breakpoints**

```
Mobile Small:  320px - 479px
Mobile:        480px - 767px
Tablet:        768px - 1023px
Desktop:       1024px+
Desktop Large: 1440px+
```

### **Card Width Responsive**

```
Mobile:  100% - 16px padding (full width, safe)
Tablet:  calc(50% - 8px) (two columns)
Desktop: calc(33% - 12px) (three columns)
```

---

## 🎪 PREMIUM TABLES

### **Stock Screener Table**

```
╔════════════╦════════════╦══════════╦═════════╦══════════╗
║ Symbol     ║ Price      ║ Change   ║ Volume  ║ PE Ratio ║
╠════════════╬════════════╬══════════╬═════════╬══════════╣
║ RELIANCE   ║ ₹2934.50   ║ ↑1.20%   ║ 2.1M    ║ 19.5     ║
║ TCS        ║ ₹3890.20   ║ ↓0.48%   ║ 1.8M    ║ 22.3     ║
║ INFY       ║ ₹1889.40   ║ ↑0.62%   ║ 2.5M    ║ 25.1     ║
║ HDFCBANK   ║ ₹1712.30   ║ ↓0.92%   ║ 3.2M    ║ 18.7     ║
║ ICICIBANK  ║ ₹1256.40   ║ ↑0.44%   ║ 2.8M    ║ 16.9     ║
╚════════════╩════════════╩══════════╩═════════╩══════════╝
```

**Table Styling:**
- Header: Bold, uppercase labels, gray background
- Rows: Alternating subtle background (very subtle)
- Borders: Minimal, 1px separator between rows
- Colors: Green for gains, red for losses
- Numbers: Monospace font, right-aligned
- Hover: Slight background highlight

---

## 🎯 PREMIUM FORM DESIGN

### **Registration Form**

```
┌─────────────────────────────────────────┐
│  Stock Wallah AI                        │
│                                         │
│  Full Name                              │
│  [_________________________________]   │
│   Name appears here                     │
│                                         │
│  Email Address                          │
│  [_________________________________]   │
│   We'll never share your email          │
│                                         │
│  Mobile Number                          │
│  [_________________________________]   │
│   +91 prefix included                   │
│                                         │
│  Choose Language                        │
│  [English v] (12 options)               │
│                                         │
│  [ ☑ ] I accept Terms & Conditions     │
│  [ ☑ ] I accept Privacy Policy         │
│  [ ☑ ] I understand the Risk           │
│                                         │
│  [   Continue Button - Green    ]       │
│                                         │
│  Secure account protected by Supabase   │
└─────────────────────────────────────────┘
```

---

## 🌟 PREMIUM ANIMATIONS

### **Page Transitions**

```
Entrance: Fade + slight slide up (200ms)
Exit:     Fade out (150ms)
Between:  Cross-fade (300ms)

Ease function: cubic-bezier(0.4, 0, 0.2, 1)
```

### **Loading States**

```
Skeleton loading: Animated shimmer effect
Loading spinner: Rotating gradient circle
Progress bar:    Smooth linear animation with color change
```

### **Data Updates**

```
Price update: Slide in effect + temporary highlight
Numbers:      Fade to new value (300ms)
Status:       Pulse effect on change
```

---

## 🎨 PREMIUM COLOR COMBINATIONS

### **Successful States**
- Background: rgba(0, 212, 168, 0.1)
- Border: #00D4A8
- Text: #00D4A8

### **Error States**
- Background: rgba(255, 90, 102, 0.1)
- Border: #FF5A66
- Text: #FF7A8A

### **Warning States**
- Background: rgba(255, 195, 42, 0.1)
- Border: #FFC32A
- Text: #FFC32A

### **Info States**
- Background: rgba(37, 99, 235, 0.1)
- Border: #2563EB
- Text: #3B82F6

---

## 📱 MOBILE-FIRST EXCELLENCE

### **Touch Targets**
- Minimum: 44px × 44px (iOS standard)
- Comfortable: 48px × 48px
- Spacing between targets: 8px minimum

### **Safe Areas**
- Top: Account for notch
- Bottom: Account for home indicator
- Sides: 16px padding minimum

---

## 🏆 DESIGN CHECKLIST

✅ **Premium dark theme** (not gray, navy-based)  
✅ **Proper typography hierarchy** (clear reading)  
✅ **Generous spacing** (luxury = breathing room)  
✅ **Smooth animations** (not jarring)  
✅ **Accessible colors** (WCAG AA compliant)  
✅ **Professional icons** (consistent style)  
✅ **Responsive layouts** (mobile-first)  
✅ **Fast interactions** (instant feedback)  
✅ **Consistent brand** (colors throughout)  
✅ **Premium feels** (shadows, borders, glows)  

---

## 🎨 IMPLEMENTATION GUIDE

### **Step 1: Install Fonts**
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap" rel="stylesheet">
```

### **Step 2: CSS Variables**
```css
:root {
  --color-primary: #00D4A8;
  --color-bg: #0A0E27;
  --color-surface: #181B33;
  --color-text: #FFFFFF;
  --color-border: rgba(255, 255, 255, 0.1);
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}
```

### **Step 3: Base Styles**
```css
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -0.01em;
}

button {
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 🎊 FINAL PREMIUM TOUCHES

1. **Micro-copy quality** — Every label is polished
2. **Error messages** — Helpful, not scary
3. **Empty states** — Beautiful, not sad
4. **Success states** — Celebratory
5. **Tooltips** — Informative and elegant
6. **Shadows** — Depth without darkness
7. **Borders** — Subtle, not harsh
8. **Whitespace** — Generous and intentional
9. **Icons** — Consistent line-weight
10. **Animations** — Purposeful, not decorative

---

**This is $100B-level design. Build it exactly as specified, and you'll have a world-class product.**

Stock Wallah AI should look like Bloomberg Terminal met Apple Design met Figma. Premium. Professional. Trustworthy.

**Execute flawlessly.** 🎨✨

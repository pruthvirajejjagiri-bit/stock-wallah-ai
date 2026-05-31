# Stock Wallah AI — SEBI Defense Playbook (Quick Reference)

**Purpose:** One-page quick reference for legal decisions during operations

**For:** Operations team, feature development, content creation

---

## ⚡ QUICK DECISION TREE

### Is This Feature/Content Safe for SEBI?

```
START HERE: [Feature/Content Decision]
                          ↓
        ┌─────────────────────────────────┐
        │ Does it recommend buying/selling │
        │ a specific stock?                │
        └─────────────────────────────────┘
              YES ↓                    NO ↓
         ❌ NOT ALLOWED          ┌──────────────────┐
         (Remove it)             │ Does it promise  │
                                 │ returns or       │
                                 │ guarantee profit?│
                                 └──────────────────┘
                                    YES ↓      NO ↓
                              ❌ NOT ALLOWED  ┌──────────────┐
                              (Remove it)     │ Does it use  │
                                              │ real money?  │
                                              └──────────────┘
                                                 YES ↓  NO ↓
                                           ❌ NOT ALLOWED  ┌────────────────┐
                                           (Remove it)     │ Is it clearly  │
                                                           │ labeled as     │
                                                           │ educational?   │
                                                           └────────────────┘
                                                              YES ↓    NO ↓
                                                           ✅ ALLOWED  ❌ ADD
                                                           (Add tag)   DISCLAIMERS
```

---

## 📋 PRE-LAUNCH COMPLIANCE CHECKLIST

### ✅ Legal Documents Ready
- [ ] Terms of Service (reviewed by lawyer)
- [ ] Privacy Policy (GDPR-compliant)
- [ ] Risk Disclaimers (feature-specific)
- [ ] Educational disclaimers (on every feature)
- [ ] Investment disclaimer (clear and prominent)

### ✅ Technical Safeguards
- [ ] Paper trading uses VIRTUAL money only
- [ ] No real NSE connections for orders
- [ ] No actual transactions in database
- [ ] User consent logs enabled
- [ ] Audit trail logging active
- [ ] Data encryption (AES-256) active
- [ ] Rate limiting enabled

### ✅ Content Requirements
- [ ] NO stock recommendations anywhere
- [ ] NO price targets or predictions
- [ ] NO "buy now" or "sell now" signals
- [ ] NO promises of profits
- [ ] EXPLICIT disclaimers on every page
- [ ] Educational focus (methodology, not predictions)

### ✅ User Experience
- [ ] First-time users see comprehensive disclaimer
- [ ] Users must acknowledge before trading
- [ ] Users can easily access all terms
- [ ] Disclaimers repeated (not buried)
- [ ] Clear distinction: Virtual vs. Real trading

### ✅ Operations
- [ ] Legal team on retainer
- [ ] Support team trained on compliance
- [ ] Incident response plan ready
- [ ] Regular compliance audits scheduled
- [ ] Regulatory monitoring system active

---

## 🚨 RED FLAGS — IMMEDIATELY STOP & FIX

### Content Red Flags

❌ **DANGEROUS LANGUAGE:**
```
"Buy this stock"
"This stock will go up"
"You should invest in this"
"This is a good investment opportunity"
"This will make you money"
"Don't miss this"
"This stock will double"
"Guaranteed returns"
```

**What to do:** Remove ALL such language

✅ **SAFE LANGUAGE:**
```
"Here's how to analyze stocks"
"This stock's P/E ratio is..."
"Market sentiment on this stock is..."
"Here's a screener result"
"This is for educational purposes"
"This teaches technical analysis"
"Here's how to interpret this metric"
```

### Feature Red Flags

❌ **DANGEROUS FEATURES:**
- Automatic stock recommendations
- "Trade now" buttons with specific stocks
- Predictions of stock prices
- Guaranteed returns advertising
- Real brokerage connection without broker license

**What to do:** Remove these features

✅ **SAFE FEATURES:**
- Educational content about analysis
- User-controlled screeners
- Virtual money simulation
- News aggregation (no predictions)
- Chart analysis tools
- Learning modules

### Payment Red Flags

❌ **DANGEROUS PAYMENTS:**
- Direct credit card processing
- Holding user money
- "Money-back if stock doesn't double"
- Profit-sharing with trades
- Charging based on trade results

**What to do:** Stop immediately

✅ **SAFE PAYMENTS:**
- Google Play Billing
- Apple App Store IAP
- Subscription model (flat fee)
- Refund policy (limited and transparent)
- No connection to trading outcomes

---

## 🔒 SEBI-SAFE FEATURE CHECKLIST

### For EVERY Feature, Ask:

#### 1. **Does it give investment advice?**
- [ ] NO - Feature is safe to proceed
- [ ] YES - Remove recommendation element

#### 2. **Does it use real money?**
- [ ] NO - Feature is safe
- [ ] YES - Must verify it's user's broker (not ours)

#### 3. **Does it promise returns?**
- [ ] NO - Feature is safe
- [ ] YES - Remove promise, add disclaimer

#### 4. **Does it have clear disclaimers?**
- [ ] YES - Feature is safe
- [ ] NO - Add prominently

#### 5. **Is it educational?**
- [ ] YES - Feature is safe
- [ ] NO - Reframe as educational

#### 6. **Could a reasonable user be misled?**
- [ ] NO - Feature is safe
- [ ] YES - Redesign or remove

---

## 📝 CONTENT CREATION RULES

### Before Publishing Educational Content

**Ask yourself:**

```
1. Am I recommending a specific stock? 
   ✅ Yes, it's educational → ALLOWED
   ❌ Yes, telling user to buy it → NOT ALLOWED

2. Am I teaching a concept or methodology?
   ✅ Teaching "how to analyze" → ALLOWED
   ❌ Teaching "what to buy" → NOT ALLOWED

3. Could someone trade based solely on this?
   ✅ They need other info too → ALLOWED
   ❌ They could execute immediately → RISKY

4. Have I explained limitations?
   ✅ "Results may vary" included → ALLOWED
   ❌ Presented as certainty → NOT ALLOWED

5. Would a lawyer read this and say "Advice"?
   ✅ Lawyer says "Education" → ALLOWED
   ❌ Lawyer says "Looks like advice" → NOT ALLOWED
```

---

## 🎙️ WHAT TO SAY (SEBI-SAFE)

### ✅ SAFE STATEMENTS

| Topic | Safe Way | Unsafe Way |
|-------|----------|-----------|
| Stock Price | "This stock is trading at ₹500" | "This stock will reach ₹600" |
| Technical Analysis | "RSI is at 75 (overbought territory)" | "RSI at 75 means buy now" |
| News | "Company announced Q1 profit increase" | "This news is bullish, buy the stock" |
| Valuation | "This stock's P/E is 20x" | "This valuation is attractive, buy it" |
| Performance | "This stock rose 10% last month" | "This stock will rise 10% next month" |
| Screening | "These stocks match your criteria" | "These are the best stocks to buy" |
| Portfolio | "Your virtual portfolio gained 5%" | "You could make 5% guaranteed" |
| Analysis | "Here's how to analyze fundamentals" | "This company is a great investment" |

---

## 📞 IF SEBI SENDS NOTICE

### IMMEDIATE ACTIONS (Day 1-2)

```
1. Stop all questionable content
   - Pause any feature SEBI might challenge
   - Keep operations running for other features

2. Secure evidence
   - Backup all server logs
   - Backup user consent records
   - Backup disclaimers as displayed
   - Backup code (for technical proof)

3. Engage lawyers
   - Contact securities lawyer immediately
   - Schedule legal strategy meeting
   - Begin response preparation

4. Document everything
   - Record what changed since SEBI notice
   - Document business rationale
   - List compliance procedures implemented
```

### RESPONSE STRATEGY (Day 3-10)

```
1. Analyze the charges
   - What specifically did SEBI claim?
   - What's our defense for each point?
   - What evidence supports our position?

2. Prepare response document
   - 20-30 page detailed response
   - Address each SEBI claim
   - Present evidence systematically
   - Reference regulatory precedent

3. Gather supporting materials
   - Screenshots of disclaimers
   - User consent logs (sample)
   - Code evidence (if technical)
   - Expert affidavits (if needed)

4. File response with SEBI
   - Submit within response period
   - Include all supporting materials
   - Request meeting/hearing if needed
```

### NEGOTIATION STRATEGY

```
Position: We are confident in our legal position
Tone: Respectful, cooperative, professional
Outcome: Likely settlement/modification, not shutdown

Offer to SEBI:
1. Additional disclaimers (if helpful)
2. Feature modifications (if reasonable)
3. User certifications (if needed)
4. Monitoring programs (if required)

What we won't do:
- Shut down educational platform
- Stop teaching analysis methods
- Remove paper trading
- Eliminate news analysis
```

---

## 📊 COMPLIANCE METRICS TO TRACK

### Daily Monitoring

```
Track:
- [ ] Illegal content posted (should be 0)
- [ ] Content without disclaimers (should be 0)
- [ ] Recommendation statements (should be 0)
- [ ] Payment anomalies
- [ ] User complaints about misleading content
- [ ] Competitor doing worse (for reference)
```

### Weekly Reporting

```
Submit to Legal:
- Any compliance incidents
- Content flags that needed fixing
- User complaints (if any)
- Regulatory developments
- Media coverage (if any)
```

### Monthly Review

```
Review with Compliance Officer:
- Overall compliance status
- Risk assessment updates
- Procedure modifications needed
- Team training requirements
- Regulatory updates
```

### Quarterly Audit

```
External Compliance Audit:
- Sample content review (random 5%)
- User experience testing
- Technical safeguards verification
- Documentation check
- Regulatory alignment review
```

---

## 🏆 GOLDEN RULES FOR SEBI-SAFE OPERATIONS

### Rule 1: Never Give Investment Advice
```
Investment Advice = Specific recommendation to specific person

Example of ADVICE:
"Mr. Sharma, buy TCS because your portfolio needs IT exposure"

Example of NOT ADVICE:
"Here's how to analyze IT sector valuations"

NEVER do the first.
```

### Rule 2: Always Distinguish Virtual from Real
```
Every time you mention trading:
"This is VIRTUAL trading in Stock Wallah"
"Real trading through your broker"
"Results are NOT guaranteed to apply to real trading"

Users must ALWAYS know: This is practice, not real.
```

### Rule 3: Education Over Prediction
```
NEVER: "Stock will go up"
ALWAYS: "Here's how to analyze if it might go up"

NEVER: "Buy this stock"
ALWAYS: "Here's a framework to evaluate stocks"

NEVER: "Guaranteed returns"
ALWAYS: "Markets are unpredictable; results vary"
```

### Rule 4: Transparency is Your Best Defense
```
Hide disclaimers? ❌ 
Promote disclaimers? ✅

Obscure terms of service? ❌
Make terms prominent? ✅

Bury risk warnings? ❌
Feature risk warnings? ✅

Transparency = Legal strength
```

### Rule 5: Document Everything
```
Every content decision documented.
Every feature change logged.
Every user consent captured.
Every compliance procedure recorded.

Why? If SEBI challenges:
We have evidence proving compliance.
```

### Rule 6: When in Doubt, Add Disclaimer
```
Unclear if safe?
→ Add disclaimer

Unsure about feature?
→ Add warning screen

Content might be misunderstood?
→ Add educational context

Better to be conservative.
SEBI can't challenge disclaimers.
```

---

## ✅ FINAL CHECKLIST BEFORE LAUNCH

```
LEGAL:
☐ All legal documents reviewed by lawyer
☐ SEBI Compliance Framework documented
☐ Feature Risk Assessment completed
☐ Regulatory Edge Cases prepared
☐ Terms of Service published
☐ Privacy Policy published
☐ Risk Disclaimers in place

TECHNICAL:
☐ Paper trading is virtual (confirmed)
☐ No real execution possible
☐ User consent logs enabled
☐ Audit trail active
☐ Data encrypted
☐ Terms versioning enabled

CONTENT:
☐ NO stock recommendations
☐ NO predictions or guarantees
☐ Disclaimers on every page
☐ Educational framing throughout
☐ First-time user tutorial complete
☐ Content audit completed

OPERATIONS:
☐ Legal team contracted
☐ Compliance procedures documented
☐ Team trained on compliance
☐ Incident response plan ready
☐ Monitoring systems active
☐ Escalation procedure defined

READINESS:
☐ Ready to defend every feature
☐ Evidence organized
☐ Precedent cases researched
☐ Expert witnesses identified
☐ Crisis communication plan ready
☐ SEBI notice response template prepared

LAUNCH: ✅ PROCEED WITH CONFIDENCE
```

---

## 🎯 BOTTOM LINE

**Stock Wallah AI is SEBI-DEFENSIBLE because:**

1. ✅ Clearly educational (not advice)
2. ✅ Uses virtual money (not brokerage)
3. ✅ Has explicit disclaimers (transparent)
4. ✅ No promises of returns (honest)
5. ✅ Documented compliance (provable)
6. ✅ Regulatory precedent supporting us
7. ✅ Can win legal battle if needed

**Launch with confidence.** 

**Operate with diligence.**

**Defend with documentation.**

---

**© 2026 Stock Wallah AI - SEBI-Ready Playbook** ⚖️

**Questions? Contact:** legal@stockwallah.ai

-- Stock Wallah AI starter schema for Supabase production upgrade.
-- This starter app runs without Supabase in demo mode.

CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  mobile TEXT NOT NULL,
  language TEXT DEFAULT 'hinglish',
  accepted_terms BOOLEAN DEFAULT FALSE,
  accepted_privacy BOOLEAN DEFAULT FALSE,
  accepted_risk BOOLEAN DEFAULT FALSE,
  is_pro BOOLEAN DEFAULT FALSE,
  subscription_status TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscription_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES app_users(id),
  email TEXT NOT NULL,
  device_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  trial_started_at TIMESTAMPTZ DEFAULT NOW(),
  trial_ends_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'trialing'
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_trial_email ON subscription_trials (LOWER(email));
CREATE UNIQUE INDEX IF NOT EXISTS unique_trial_device ON subscription_trials (device_id);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES app_users(id),
  email TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'android',
  product_id TEXT NOT NULL,
  purchase_token TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL,
  is_pro BOOLEAN DEFAULT FALSE,
  current_period_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

# Backyard Comfort Backend - Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- OpenAI API key
- PayPal merchant account (sandbox or production)

## Step 1: Clone Repository

```bash
git clone https://github.com/backyardcomfort/backyard-comfort-backend.git
cd backyard-comfort-backend
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Setup Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database to find your connection string
4. Copy the PostgreSQL connection URL

## Step 4: Environment Configuration

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:

```env
# Supabase
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]

# OpenAI
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4-turbo

# PayPal
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-client-secret
PAYPAL_MODE=sandbox
PAYPAL_WEBHOOK_ID=your-webhook-id

# Email
ZOHO_EMAIL=backyardcomfort@zohomail.com
ZOHO_API_KEY=your-api-key

# Auth
JWT_SECRET=your-secret-key-change-in-production

# Social
FACEBOOK_URL=https://www.facebook.com/share/1GNautEQim/
INSTAGRAM_HANDLE=backyard.comfort
TIKTOK_HANDLE=backyard.comfort
YOUTUBE_URL=https://www.youtube.com/@Backyard.Comfort
PINTEREST_HANDLE=@backyardcomfort
THREADS_HANDLE=@backyard.comfort
X_HANDLE=@backyardvanlife
BEACONS_URL=https://beacons.ai/backyardcomfort
```

## Step 5: Database Setup

```bash
npm run prisma:generate
npm run db:setup
```

This will:
1. Generate Prisma client
2. Run migrations
3. Seed initial data

## Step 6: Run Development Server

```bash
npm run dev
```

Server will be available at `http://localhost:3000`

## Step 7: Test Health Endpoint

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

## PayPal Sandbox Setup

1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create a sandbox app
3. Get your Client ID and Client Secret
4. Create a test merchant account
5. Create a test buyer account
6. Add credentials to `.env.local`

## Troubleshooting

**Database connection error?**
- Check your DATABASE_URL is correct
- Ensure Supabase project is running
- Verify firewall allows connections

**OpenAI errors?**
- Verify API key is valid
- Check you have API credits
- Ensure model name is correct

**PayPal webhook not firing?**
- Verify webhook ID in dashboard
- Check API credentials are correct
- Test in sandbox mode first

## Next Steps

- Review [API Documentation](./docs/API.md)
- Setup [GitHub Actions CI/CD](../.github/workflows)
- Configure [Vercel Deployment](./docs/DEPLOYMENT.md)

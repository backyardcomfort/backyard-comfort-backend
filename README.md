# Backyard Comfort Backend

Production-ready backend for the Backyard Comfort AI-powered commerce ecosystem.

**Status:** MVP Phase | Simple, scalable, ready to grow

---

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)
- OpenAI API key
- PayPal sandbox credentials

### 1. Clone & Install
```bash
git clone https://github.com/backyardcomfort/backyard-comfort-backend.git
cd backyard-comfort-backend
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Fill in your credentials:
```
# Supabase
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]

# OpenAI
OPENAI_API_KEY=sk-...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox

# Email
ZOHO_EMAIL=backyardcomfort@zohomail.com
ZOHO_API_KEY=...

# Social Media
FACEBOOK_URL=https://www.facebook.com/share/1GNautEQim/
INSTAGRAM_HANDLE=backyard.comfort
TIKTOK_HANDLE=backyard.comfort
YOUTUBE_URL=https://www.youtube.com/@Backyard.Comfort
PINTEREST_HANDLE=@backyardcomfort
THREADS_HANDLE=@backyard.comfort
X_HANDLE=@backyardvanlife
BEACONS_URL=https://beacons.ai/backyardcomfort
```

### 3. Setup Database
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Locally
```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

## Architecture

```
backyard-comfort-backend/
├── api/                      # API routes
│   ├── products.ts
│   ├── orders.ts
│   ├── ai-setup.ts
│   ├── paypal/
│   │   ├── create-order.ts
│   │   ├── capture-order.ts
│   │   └── webhook.ts
│   ├── auth.ts
│   └── health.ts
├── lib/
│   ├── prisma.ts            # Prisma client
│   ├── openai.ts            # OpenAI setup
│   ├── paypal.ts            # PayPal utilities
│   ├── ai-prompts.ts        # AI prompt templates
│   └── utils.ts
├── middleware/
│   ├── auth.ts              # JWT/auth
│   ├── rate-limit.ts        # Rate limiting
│   └── webhook-verify.ts    # Webhook signing
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/
│   └── seed.ts              # Seed data
├── types/
│   ├── api.ts
│   ├── paypal.ts
│   └── index.ts
├── .env.example
├── package.json
└── README.md
```

---

## Core Features (MVP)

✅ **Products** - Create, read, list with filters
✅ **Orders** - Create orders, track status
✅ **PayPal Integration** - Webhooks, payment verification
✅ **AI Setup Builder** - Generate shopping lists from user inputs
✅ **AI Assistant** - Conversational product recommendations
✅ **Bundle Builder** - Create and recommend bundles
✅ **Membership System** - Free + premium tiers
✅ **Subscriptions** - Recurring billing ready
✅ **Affiliate Tracking** - Commission tracking
✅ **Email Automation** - Hooks for Klaviyo/Brevo
✅ **Social Links** - All platforms integrated
✅ **Analytics Ready** - Event tracking hooks

---

## API Endpoints (MVP)

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create (admin)
- `PUT /api/products/:id` - Update (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order
- `GET /api/orders` - List user orders

### AI
- `POST /api/ai-setup` - Generate setup from user inputs
- `POST /api/ai-assistant` - Chat with assistant
- `POST /api/ai-bundles` - Generate bundle recommendations

### PayPal
- `POST /api/paypal/create-order` - Initialize PayPal order
- `POST /api/paypal/capture-order` - Capture payment
- `POST /api/paypal/webhook` - Handle webhooks

### Auth
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `GET /api/auth/me` - Current user

### Health
- `GET /api/health` - System status

---

## Database Schema

**Core Models:**
- Users
- Products
- Orders & OrderItems
- Bundles & BundleItems
- Subscriptions & SubscriptionItems
- Memberships
- Affiliates & AffiliateTransactions
- AiSetups
- PayPalTransactions
- WebhookEvents
- AuditLogs

See `prisma/schema.prisma` for complete schema.

---

## Environment Variables

Create `.env.local` with:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL=

# API
NODE_ENV=development
API_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4-turbo

# PayPal
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_MODE=sandbox

# Email
ZOHO_EMAIL=backyardcomfort@zohomail.com
ZOHO_API_KEY=

# Auth
JWT_SECRET=

# Social Media
FACEBOOK_URL=https://www.facebook.com/share/1GNautEQim/
INSTAGRAM_HANDLE=backyard.comfort
TIKTOK_HANDLE=backyard.comfort
YOUTUBE_URL=https://www.youtube.com/@Backyard.Comfort
PINTEREST_HANDLE=@backyardcomfort
THREADS_HANDLE=@backyard.comfort
X_HANDLE=@backyardvanlife
BEACONS_URL=https://beacons.ai/backyardcomfort

# Analytics (GA4, Meta Pixel)
GA4_MEASUREMENT_ID=
META_PIXEL_ID=
```

---

## Deployment

### Vercel (Recommended)
```bash
vercel env add DATABASE_URL
vercel env add OPENAI_API_KEY
vercel env add PAYPAL_CLIENT_ID
vercel env add PAYPAL_CLIENT_SECRET
vercel env add JWT_SECRET

vercel deploy
```

### Docker
```bash
docker build -t backyard-comfort-backend .
docker run -p 3000:3000 --env-file .env.local backyard-comfort-backend
```

---

## Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# PayPal webhook simulation
npm run test:paypal-webhook

# AI Setup Builder
npm run test:ai-setup
```

---

## Support

**Email:** backyardcomfort@zohomail.com

**Social:**
- Instagram: @backyard.comfort
- TikTok: @backyard.comfort
- Facebook: [Backyard Comfort](https://www.facebook.com/share/1GNautEQim/)
- X: @backyardvanlife
- YouTube: [@Backyard.Comfort](https://www.youtube.com/@Backyard.Comfort)
- Pinterest: @backyardcomfort
- Threads: @backyard.comfort
- Beacons: [beacons.ai/backyardcomfort](https://beacons.ai/backyardcomfort)

---

## License

Proprietary. All rights reserved © Backyard Comfort.

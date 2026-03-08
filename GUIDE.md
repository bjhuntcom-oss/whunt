# Whunt — Complete Deployment Guide

> **Version**: 3.2.0 · **Last Updated**: 2026-03-08

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Security Configuration](#security-configuration)
6. [Build & Run](#build--run)
7. [Deployment Options](#deployment-options)
   - [PM2 (Recommended)](#option-1-pm2-recommended)
   - [Docker / Docker Compose](#option-2-docker)
   - [Systemd Service](#option-3-systemd-service)
   - [Dokploy](#option-4-dokploy)
8. [Nginx Reverse Proxy](#nginx-reverse-proxy)
9. [SSL / HTTPS](#ssl--https)
10. [Updates & Maintenance](#updates--maintenance)
11. [Security Hardening](#security-hardening)
12. [Monitoring & Logging](#monitoring--logging)
13. [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Component       | Minimum Version | Purpose                          |
|-----------------|-----------------|----------------------------------|
| **Node.js**     | 18+             | Runtime                          |
| **PostgreSQL**  | 14+             | Primary database                 |
| **Redis**       | 6+              | Rate limiting, caching, sessions |
| **PM2**         | latest          | Process management               |
| **Nginx**       | 1.18+           | Reverse proxy (production)       |
| **Git**         | 2.x             | Source control                   |

---

## Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd whunt

# Install dependencies
npm install

# Verify the install
node -v    # Should be >= 18
npm -v
```

---

## Environment Configuration

Copy the example and fill in your values:

```bash
cp .env.example .env
```

### Required Variables

```env
# ─── Database ─────────────────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/whunt

# ─── Session ──────────────────────────────────────────
SESSION_SECRET=<openssl rand -base64 32>

# ─── Redis ────────────────────────────────────────────
REDIS_URL=redis://localhost:6379

# ─── Encryption (payment secrets) ─────────────────────
ENCRYPTION_KEY=<openssl rand -hex 32>

# ─── Application ──────────────────────────────────────
APP_URL=https://yourdomain.com
PORT=5000
NODE_ENV=production
FORCE_HTTPS=true

# ─── Rate Limiting ────────────────────────────────────
API_RATE_LIMIT=100

# ─── CORS ─────────────────────────────────────────────
WIDGET_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# ─── WhatsApp Business API ────────────────────────────
WHATSAPP_API_VERSION=v23.0
WHATSAPP_BUSINESS_ACCOUNT_ID=<your-account-id>
WHATSAPP_ACCESS_TOKEN=<your-access-token>
WHATSAPP_PHONE_NUMBER_ID=<your-phone-number-id>
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<your-webhook-token>

# ─── Payment Providers (encrypted at rest) ────────────
STRIPE_SECRET_KEY=<your-stripe-key>
STRIPE_PUBLISHABLE_KEY=<your-stripe-public-key>
RAZORPAY_KEY_ID=<your-razorpay-id>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
```

### Optional Variables

```env
# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Monitoring
SENTRY_DSN=<your-sentry-dsn>
LOG_LEVEL=info
```

### Generate Security Keys

```bash
# Encryption key (64-char hex, required for payment encryption)
openssl rand -hex 32

# Session secret (32+ bytes)
openssl rand -base64 32
```

---

## Database Setup

```bash
# Generate Drizzle migrations
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data (optional)
npm run seed
```

---

## Security Configuration

### Encrypt Payment Provider Secrets

If you have existing payment credentials in the database:

```bash
npm run encrypt:payment-keys
```

This encrypts all provider secrets using AES-256-GCM. Supported providers:
- Stripe (API Secret, Test Secret)
- Razorpay (Key ID, Key Secret)
- PayPal (Client ID, Client Secret)
- Paystack (Secret Key, Test Secret)
- Mercado Pago (Access Token)

### Pre-Deployment Checklist

- [ ] `ENCRYPTION_KEY` is set (64 hex characters)
- [ ] `SESSION_SECRET` is strong (32+ bytes)
- [ ] `NODE_ENV=production`
- [ ] `FORCE_HTTPS=true`
- [ ] `WIDGET_ALLOWED_ORIGINS` restricted to your domains
- [ ] Redis is accessible and optionally password-protected
- [ ] Database uses SSL connection in production
- [ ] Payment keys are encrypted (`npm run encrypt:payment-keys`)
- [ ] Rate limiting is configured
- [ ] SSL certificate is valid
- [ ] Firewall rules are configured

---

## Build & Run

```bash
# Build the application (client + server)
npm run build

# Start in development mode
npm run dev

# Start in production mode
node dist/index.js
```

---

## Deployment Options

### Option 1: PM2 (Recommended)

```bash
# Start the application
pm2 start ecosystem.config.cjs

# Save PM2 process list
pm2 save

# Auto-start on server reboot
pm2 startup
```

**PM2 Configuration** (`ecosystem.config.cjs` is already included):

```javascript
module.exports = {
  apps: [{
    name: 'whunt',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '1G',
    autorestart: true,
    watch: false
  }]
};
```

### Option 2: Docker

The project includes `Dockerfile` and `docker-compose.yml`.

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Rebuild after code changes
docker-compose up -d --build
```

For Dokploy deployments, use the included `docker-compose.dokploy.yml`:

```bash
docker-compose -f docker-compose.dokploy.yml up -d
```

### Option 3: Systemd Service

Create `/etc/systemd/system/whunt.service`:

```ini
[Unit]
Description=Whunt WhatsApp Marketing Platform
After=network.target postgresql.service redis.service

[Service]
Type=simple
User=whunt
WorkingDirectory=/opt/whunt
Environment="NODE_ENV=production"
EnvironmentFile=/opt/whunt/.env
ExecStart=/usr/bin/node /opt/whunt/dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable whunt
sudo systemctl start whunt
sudo systemctl status whunt
```

### Option 4: Dokploy

The project includes `dokploy.json` configuration. Push to your repository and configure Dokploy to deploy from your branch.

---

## Nginx Reverse Proxy

The project includes a ready-to-use `nginx.conf`. Key configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    # Uploads
    location /uploads/ {
        alias /opt/whunt/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    client_max_body_size 50M;
}
```

---

## SSL / HTTPS

### Let's Encrypt (Certbot)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run
```

---

## Updates & Maintenance

### Standard Update Process

```bash
git pull origin main
npm install
npm run db:push          # Apply schema changes
npm run build
pm2 restart whunt
pm2 logs whunt           # Verify
```

### Rotating the Encryption Key

> This requires re-encrypting all payment secrets. **Backup first.**

```bash
pg_dump whunt > backup_$(date +%Y%m%d).sql
NEW_KEY=$(openssl rand -hex 32)
export ENCRYPTION_KEY=$NEW_KEY
npm run encrypt:payment-keys
# Update .env with the new ENCRYPTION_KEY
pm2 restart whunt
```

### Database Backup

```bash
# Manual backup
pg_dump -U whunt -h localhost whunt > backup.sql

# Restore
psql -U whunt -h localhost whunt < backup.sql
```

---

## Security Hardening

1. **Never commit `.env`** to version control
2. **Use separate keys** for dev / staging / production
3. **Rotate encryption keys** every 90 days
4. **Enable database SSL** in production (`?sslmode=require` in DATABASE_URL)
5. **Use Redis AUTH** (`redis://:password@localhost:6379`)
6. **Restrict CORS** to your domains only
7. **Enable HSTS** in Nginx
8. **Rate limit** is enabled by default (100 req/min, configurable)
9. **Keep dependencies updated** — `npm audit fix`
10. **Monitor logs** for suspicious activity

### Payment Provider Encryption

- All payment credentials are encrypted at rest using AES-256-GCM
- Format: `iv:authTag:ciphertext` (hex-encoded)
- Unique IV per encryption (prevents pattern analysis)
- Backward compatible with legacy unencrypted data (logged warning)

### LocalStorage Validation

- Zod schemas validate user data and site IDs from localStorage
- Automatic cleanup of invalid / tampered data
- Protection against XSS payload injection

---

## Monitoring & Logging

### Health Checks

```bash
curl https://yourdomain.com/api/health
curl https://yourdomain.com/api/version
```

### PM2 Monitoring

```bash
pm2 logs whunt            # Live logs
pm2 monit                  # Real-time dashboard
pm2 status                 # Process status
```

### Application Logs

```bash
tail -f logs/out.log       # Standard output
tail -f logs/err.log       # Error output
journalctl -u whunt -f    # Systemd logs
```

### Key Metrics to Monitor

| Metric                        | What to Watch                         |
|-------------------------------|---------------------------------------|
| **Rate limit 429 responses**  | Legitimate users being blocked        |
| **Encryption errors**         | `[Payment] Failed to decrypt` in logs |
| **Redis connection**          | Fallback to in-memory store           |
| **Memory usage**              | > 1GB indicates potential leak        |
| **Response times**            | P95 > 500ms needs investigation       |
| **Failed auth attempts**      | Potential brute force attacks         |
| **LocalStorage warnings**     | Potential XSS attempts                |

### Rate Limit Response Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1678901234
Retry-After: 30
```

### Exempted Endpoints (no rate limiting)

- `/api/webhooks/*`
- `/api/health`
- `/api/version`
- `/api/agents/online`

---

## Troubleshooting

### Encryption Errors

**Symptom**: `Failed to decrypt payment provider secrets`

1. Verify `ENCRYPTION_KEY` is exactly 64 hex characters
2. Check if keys were encrypted with a different key
3. Re-run `npm run encrypt:payment-keys`

### Rate Limiting Issues

**Symptom**: Legitimate users getting 429 errors

1. Increase `API_RATE_LIMIT` in `.env`
2. Check Redis connection (`redis-cli ping`)
3. Review rate limit logs

### Redis Connection Failed

**Symptom**: Rate limiting falls back to in-memory store

1. Verify Redis is running: `redis-cli ping`
2. Check `REDIS_URL` in `.env`
3. Test connectivity from the app server
4. Review Redis logs

### Database Migration Failed

1. Backup database first
2. Verify database connectivity
3. Check migration logs
4. Try `npm run db:push` for a force push

### Build Failures

```bash
# Clear and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### WebSocket Connection Issues

1. Verify Nginx WebSocket proxy configuration
2. Check that `proxy_set_header Upgrade $http_upgrade;` is present
3. Verify the `/socket.io/` location block exists

---

**Support**: support@whunt.io · https://whunt.io

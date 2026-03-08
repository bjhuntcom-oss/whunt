# 🚀 Deployment Guide - Whunt v3.2.0

This guide covers deploying Whunt v3.2.0 with all security features enabled.

---

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ database
- Redis 6+ server
- PM2 for process management
- SSL certificate (for production)

---

## 🔧 Initial Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd whunt
npm install
```

### 2. Generate Security Keys

```bash
# Generate encryption key for payment secrets
openssl rand -hex 32

# Generate session secret
openssl rand -base64 32
```

### 3. Configure Environment

Create `.env` file:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/whunt

# Session
SESSION_SECRET=<generated-session-secret>

# Redis
REDIS_URL=redis://localhost:6379

# Encryption (REQUIRED for production)
ENCRYPTION_KEY=<generated-encryption-key>

# Application
APP_URL=https://yourdomain.com
PORT=5000
NODE_ENV=production
FORCE_HTTPS=true

# Rate Limiting
API_RATE_LIMIT=100

# CORS
WIDGET_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# WhatsApp Business API
WHATSAPP_API_VERSION=v23.0
WHATSAPP_BUSINESS_ACCOUNT_ID=<your-account-id>
WHATSAPP_ACCESS_TOKEN=<your-access-token>
WHATSAPP_PHONE_NUMBER_ID=<your-phone-number-id>
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<your-webhook-token>

# Payment Providers (will be encrypted)
STRIPE_SECRET_KEY=<your-stripe-key>
STRIPE_PUBLISHABLE_KEY=<your-stripe-public-key>
RAZORPAY_KEY_ID=<your-razorpay-id>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>

# Optional: Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Optional: Monitoring
SENTRY_DSN=<your-sentry-dsn>
LOG_LEVEL=info
```

### 4. Database Setup

```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:push

# Optional: Seed initial data
npm run seed
```

### 5. Encrypt Payment Keys

If you have existing payment provider credentials in the database:

```bash
npm run encrypt:payment-keys
```

This will encrypt all payment provider secrets using AES-256-GCM.

### 6. Build Application

```bash
npm run build
```

---

## 🔒 Security Checklist

Before deploying to production, verify:

- [ ] `ENCRYPTION_KEY` is set and is 64 hex characters
- [ ] `SESSION_SECRET` is set and is strong (32+ bytes)
- [ ] `NODE_ENV=production` is set
- [ ] `FORCE_HTTPS=true` is set
- [ ] `WIDGET_ALLOWED_ORIGINS` contains only your domains
- [ ] Redis is accessible and secured
- [ ] Database uses SSL connection
- [ ] Payment keys are encrypted (run migration script)
- [ ] Rate limiting is configured
- [ ] CORS origins are restricted
- [ ] SSL certificate is valid
- [ ] Firewall rules are configured

---

## 🚀 Deployment Options

### Option 1: PM2 (Recommended)

```bash
# Start application
pm2 start dist/index.js --name whunt

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### PM2 Configuration File

Create `ecosystem.config.js`:

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

Start with:
```bash
pm2 start ecosystem.config.js
```

### Option 2: Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=redis://redis:6379
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}
      - SESSION_SECRET=${SESSION_SECRET}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=whunt
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

Deploy:
```bash
docker-compose up -d
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

Enable and start:
```bash
sudo systemctl enable whunt
sudo systemctl start whunt
sudo systemctl status whunt
```

---

## 🔄 Updates and Maintenance

### Updating to New Version

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Run database migrations
npm run db:update

# Rebuild application
npm run build

# Restart application
pm2 restart whunt

# Check logs
pm2 logs whunt
```

### Rotating Encryption Key

⚠️ **Warning**: Rotating the encryption key requires re-encrypting all secrets.

```bash
# 1. Generate new key
NEW_KEY=$(openssl rand -hex 32)

# 2. Backup database
pg_dump whunt > backup_$(date +%Y%m%d).sql

# 3. Export old key
export OLD_ENCRYPTION_KEY=$ENCRYPTION_KEY

# 4. Set new key
export ENCRYPTION_KEY=$NEW_KEY

# 5. Re-encrypt all secrets
npm run encrypt:payment-keys

# 6. Update .env with new key
echo "ENCRYPTION_KEY=$NEW_KEY" >> .env

# 7. Restart application
pm2 restart whunt
```

---

## 📊 Monitoring

### Health Checks

```bash
# Application health
curl https://yourdomain.com/api/health

# Version check
curl https://yourdomain.com/api/version
```

### Logs

```bash
# PM2 logs
pm2 logs whunt

# Application logs
tail -f logs/out.log
tail -f logs/err.log

# System logs
journalctl -u whunt -f
```

### Metrics to Monitor

1. **Rate Limiting**
   - Monitor 429 responses
   - Check Redis connection status
   - Watch for fallback to memory store

2. **Encryption**
   - Look for decryption errors in logs
   - Verify payment flows work correctly

3. **Performance**
   - Response times
   - Memory usage
   - CPU usage
   - Database query times

4. **Security**
   - Failed authentication attempts
   - Invalid localStorage data warnings
   - CORS violations

---

## 🆘 Troubleshooting

### Encryption Errors

**Problem**: `Failed to decrypt payment provider secrets`

**Solution**:
1. Verify `ENCRYPTION_KEY` is correct (64 hex characters)
2. Check if keys were encrypted with different key
3. Re-run encryption migration script

### Rate Limiting Issues

**Problem**: Legitimate users getting 429 errors

**Solution**:
1. Increase `API_RATE_LIMIT` in .env
2. Check Redis connection
3. Review rate limit logs

### Redis Connection Failed

**Problem**: Rate limiting falls back to memory

**Solution**:
1. Verify Redis is running: `redis-cli ping`
2. Check `REDIS_URL` in .env
3. Verify network connectivity
4. Check Redis logs

### Database Migration Failed

**Problem**: Migration errors during deployment

**Solution**:
1. Backup database first
2. Check database connectivity
3. Review migration logs
4. Manually apply migration if needed

---

## 🔐 Security Best Practices

1. **Never commit `.env` to version control**
2. **Use different keys for dev/staging/production**
3. **Rotate encryption keys periodically (every 90 days)**
4. **Enable database SSL in production**
5. **Use Redis password authentication**
6. **Restrict CORS origins to your domains only**
7. **Enable HTTPS and HSTS**
8. **Regular security audits**
9. **Keep dependencies updated**
10. **Monitor logs for suspicious activity**

---

## 📞 Support

For deployment issues:
- Email: cs@diploy.in
- Website: https://diploy.in
- Documentation: See `SECURITY.md` and `AUDIT.md`

---

**Last Updated**: 2026-03-08
**Version**: 3.2.0
**Status**: Production Ready ✅

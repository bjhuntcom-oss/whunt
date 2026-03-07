# Whunt — Journal des modifications

> Audit complet, refonte sécurité et redesign UI réalisés le 2026-03-07.

---

## 1. Renommage de l'application → **Whunt**

| Élément | Avant | Après |
|---------|-------|-------|
| Nom de l'app | Diploy / WhatsWay | **Whunt** |
| Package core | `@diploy/core` / `packages/diploy-core` | `@whunt/core` / `packages/whunt-core` |
| `package.json` name | `"rest-express"` | `"whunt"` |
| PM2 app name | `"whatsway"` | `"whunt"` |
| HTML title | *(vide)* | `"Whunt"` |
| Constants | `DIPLOY_PRODUCT_NAME = "Diploy"` | `WHUNT_PRODUCT_NAME = "Whunt"` |
| Logger | `diployLogger` | `whuntLogger` |
| Header HTTP | `X-Powered-By: Diploy vX.X` | `X-Powered-By: Whunt vX.X` |
| Deploy script | `pm2 restart whatsway` | `pm2 restart whunt` |

**Compatibilité backward** : `@diploy/core`, `diployLogger`, `DIPLOY_*` restent exportés comme alias — aucune régression sur le code existant qui n'a pas encore migré.

---

## 2. Corrections de sécurité

### 2.1 Session cookie — CRITIQUE
```diff
- secure: false,
+ secure: process.env.NODE_ENV === "production",
+ sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
+ name: "whunt.sid",
```
En production, `SESSION_SECRET` non défini provoque désormais un crash explicite au démarrage (fail-fast).

### 2.2 Socket.IO CORS — HAUTE
```diff
- origin: "*",  // tous les domaines
+ origin: process.env.ALLOWED_ORIGINS?.split(",") ?? false,
```
En production sans `ALLOWED_ORIGINS`, toutes les connexions cross-origin sont bloquées.

### 2.3 Headers de sécurité — nouveau middleware
Fichier : `server/middlewares/security.middleware.ts`

| Header | Valeur |
|--------|--------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | géolocalisation, micro, caméra, paiement — tous désactivés |
| `Content-Security-Policy` | actif en production |
| `Strict-Transport-Security` | 1 an, includeSubDomains, preload (production) |
| `X-Powered-By` | supprimé (anti-fingerprinting) |

### 2.4 Error handler — MOYENNE
```diff
- res.status(status).json({ message });
- throw err;  // ← re-throw après réponse = crash process
+ if (status >= 500) whuntLogger.error(...)
+ if (!res.headersSent) res.status(status).json({ success: false, message });
+ // En prod : message générique pour les 5xx
```

### 2.5 Logging API — MOYENNE (fuite de données)
```diff
- logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;  // expose données sensibles
+ log(`${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`);
```

### 2.6 Dead code supprimé
- Handler `agent_join_conversationOLD` (socket.io) — handler dupliqué identique

---

## 3. Variables d'environnement requises

| Variable | Obligatoire prod | Description |
|----------|-----------------|-------------|
| `DATABASE_URL` | ✅ | URL PostgreSQL |
| `SESSION_SECRET` | ✅ | Clé de chiffrement sessions (≥32 chars) |
| `ALLOWED_ORIGINS` | ✅ | Origines CORS autorisées, ex: `https://whunt.io` |
| `PORT` | — | Port serveur (défaut: 5000) |
| `REDIS_URL` | — | Redis pour Socket.IO multi-instance |
| `OPENAI_API_KEY` | — | Fonctions IA |
| `SMTP_*` | — | Emails |
| `STRIPE_SECRET_KEY` | — | Paiements Stripe |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | ✅ | Sécurité webhooks Meta |

---

## 4. Refonte frontend — Design System Ultra-Black

### 4.1 Concept
Inspiré du design de la documentation BJHUNT — ultra-noir, minimal, technique, sobre. Zéro compromis sur la clarté.

### 4.2 Palette de couleurs

| Rôle | Token CSS | Valeur hex |
|------|-----------|------------|
| Fond principal | `--bg` | `#050505` |
| Fond carte | `--bg-s` | `#0a0a0a` |
| Fond élevé | `--bg-b` | `#1a1a1a` |
| Texte principal | `--text` | `#e0e0e0` |
| Texte secondaire | `--text-2` | `#999999` |
| Texte tertiaire | `--text-3` | `#555555` |
| **Vert** (actif/succès) | `--green` | `#00ff88` |
| **Orange** (avertissement) | `--orange` | `#ff8c00` |
| **Rouge** (erreur/danger) | `--red` | `#ff3b3b` |
| Bordure | `--brd` | `#1a1a1a` |

### 4.3 Typographie

| Usage | Police |
|-------|--------|
| Titres, corps | **Inter** (300–900) |
| Code, labels, nav, badges, boutons, formulaires | **JetBrains Mono** (300–700) |

Chargées via Google Fonts dans `client/index.html`.

### 4.4 Classes CSS utilitaires (index.css)

| Classe | Usage |
|--------|-------|
| `.grid-bg` / `.grid-bg-fine` | Grille de fond (32px / 16px) |
| `.grid-fade` | Fondu en bas via mask |
| `.card-dark` | Carte standard sombre |
| `.stat-card` / `.stat-value` / `.stat-label` | Carte statistique |
| `.tag-green` / `.tag-orange` / `.tag-red` / `.tag-neutral` | Badges état |
| `.status-dot-green/orange/red` | Points de statut animés |
| `.cx-block` / `.cx-block-orange` / `.cx-block-red` | Blocs contextuels (bordure colorée) |
| `.btn-primary` / `.btn-ghost` / `.btn-danger` | Boutons |
| `.input-dark` | Inputs sombres |
| `.nav-item` / `.nav-item.active` | Liens de navigation |
| `.table-dark` | Tableaux |
| `.mono-label` | Labels uppercase JetBrains Mono |
| `.glass-card` | Carte avec backdrop-blur |
| `.glow-green/orange/red` | Lueur subtile |
| `.fade-in` / `.slide-in` | Animations d'entrée |

### 4.5 Tailwind — nouvelles classes
```
bg-whunt-bg          text-whunt-green      border-whunt-brd
bg-whunt-bg-s        text-whunt-orange     bg-grid-pattern
bg-whunt-bg-b        text-whunt-red        bg-grid-fine
font-mono            text-whunt-text-2     bg-size-grid-32
```

### 4.6 Composants redesignés

| Composant | Changements clés |
|-----------|-----------------|
| **Sidebar** | Fond `#0a0a0a`, nav JetBrains Mono 11.5px, actif vert `#00ff88`, AI toggle minimaliste, profil compact |
| **Login** | Split 50/50, grille en fond gauche + gradient fade, inputs custom sombres, badges de confiance minimalistes |
| **404** | Ultra-minimal, typo mono, bouton vert retour |
| **403** | Idem, couleur rouge pour le code d'erreur |
| **Loaders** | Spinner vert sur fond `#050505`, texte mono uppercase |
| **App layout** | Fond `#050505` sur toutes les vues authentifiées |

---

## 5. Fichiers supprimés

| Fichier | Raison |
|---------|--------|
| `packages/diploy-core/` | Remplacé par `packages/whunt-core/` |
| `server/routes/automation.routes-old.ts` | Dead code explicitement nommé "old" |
| `server/routes/automations.routes.ts` | Import commenté dans `index.ts`, jamais utilisé |
| `client/src/pages/Groups.tsx` | Stub vide (3 lignes), remplacé par `group-list.tsx` |
| `AUDIT_RAPPORT.md` | Remplacé par ce document |
| `RECOMMANDATIONS_CODE.md` | Recommandations appliquées |
| `documentation.html` | Ancienne documentation interne |
| `.DS_Store` | Fichier système macOS |

---

## 6. Corrections de maintenabilité

| Problème | Correction |
|----------|-----------|
| Script `db:seed` référence `server/seed-all.ts` inexistant | Script supprimé de `package.json` |
| Imports `@diploy/core` dans 35+ fichiers serveur | Migrés vers `@whunt/core` via remplacement mass |
| `tsconfig.json` : alias manquant | Ajout de `@whunt/core` en plus de `@diploy/core` |
| Build esbuild : un seul alias | Ajout des deux aliases `@diploy/core` et `@whunt/core` |

---

## 7. Architecture des packages

```
packages/
└── whunt-core/          ← unique source de vérité
    ├── constants.ts     (WHUNT_* + DIPLOY_* compat aliases)
    ├── errors.ts        (WhuntError + DiployError alias)
    ├── response.ts      (WhuntResponse + DiployResponse alias)
    ├── logger.ts        (whuntLogger + diployLogger alias)
    ├── format.ts        (fonctions utilitaires)
    ├── validate.ts      (validation + asyncHandler)
    └── index.ts         (exports unifiés)
```

---

## 8. Checklist déploiement production

- [ ] Définir `SESSION_SECRET` (≥32 caractères aléatoires)
- [ ] Définir `ALLOWED_ORIGINS` (ex: `https://whunt.io,https://app.whunt.io`)
- [ ] Définir `DATABASE_URL`
- [ ] Définir `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
- [ ] Installer dépendances : `npm install`
- [ ] Construire : `npm run build`
- [ ] Migrer BDD : `npm run db:push`
- [ ] Démarrer PM2 : `pm2 start ecosystem.config.cjs`
- [ ] Vérifier : `pm2 status` → état `online` pour `whunt`
- [ ] Vérifier headers : `curl -I https://whunt.io/api/version` → `X-Powered-By: Whunt vX.X`

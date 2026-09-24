# 🏛️ Proyecto Semana 08 — Club Social API (RBAC + Seguridad)

API REST segura del dominio **Club Social** con autenticación JWT, autorización RBAC, Helmet, CORS whitelist, rate limiting y sanitización anti-NoSQL injection.

## 🎯 Dominio

**Recurso principal:** `members` (socios del club)

| Campo            | Tipo                                   | Descripción                          |
|------------------|----------------------------------------|--------------------------------------|
| `fullName`       | `string`                               | Nombre completo del socio            |
| `membershipType` | `'regular' \| 'vip' \| 'honorario'`    | Tipo de membresía                    |
| `monthlyFee`     | `number`                               | Cuota mensual                        |
| `active`         | `boolean`                              | Si el socio está activo              |
| `joinedAt`       | `Date`                                 | Fecha de ingreso                     |
| `createdBy`      | `string`                               | ID del usuario que lo registró       |

## 🔐 Tabla de roles y permisos

| Endpoint                         | Método | Acceso                                      |
|----------------------------------|--------|---------------------------------------------|
| `/api/v1/members`                | GET    | Público                                     |
| `/api/v1/members/:id`            | GET    | Público                                     |
| `/api/v1/members`                | POST   | Autenticado (`user` o `admin`)              |
| `/api/v1/members/:id`            | PATCH  | Autenticado + dueño **o** `admin`           |
| `/api/v1/members/:id`            | DELETE | Solo `admin`                                |
| `/api/v1/auth/*`                 | *      | Público (con rate limit estricto)           |
| `/api/v1/users/dashboard`        | GET    | Autenticado                                 |

## 🛡️ Capas de seguridad aplicadas

1. **Helmet** — cabeceras HTTP de seguridad (CSP, X-Content-Type-Options, etc.)
2. **CORS** — whitelist de orígenes (`localhost:5173`, `localhost:3001`), no `*`
3. **Rate limiting global** — 100 req / 15 min
4. **Rate limiting auth** — 5 req / 15 min en `/auth/login` y `/auth/register`
5. **express-mongo-sanitize** — previene NoSQL injection (`$gt`, `$ne`, etc.)
6. **Zod** — valida y rechaza HTML en inputs (mitiga XSS)
7. **RBAC** — `authMiddleware` + `requireRole('admin')`
8. **Errores seguros** — sin stack traces en respuestas

## 🚀 Cómo correrlo

```bash
# 1. Levantar MongoDB
docker compose up -d

# 2. Instalar dependencias
pnpm install
# o: npm install

# 3. Variables de entorno
cp .env.example .env

# 4. Iniciar en desarrollo
pnpm dev
```

Servidor: `http://localhost:3000`  
Health: `http://localhost:3000/api/v1/health`

### Usuarios seed (se crean al arrancar)

| Email            | Password    | Rol   |
|------------------|-------------|-------|
| user@test.com    | User1234!   | user  |
| admin@test.com   | Admin1234!  | admin |

## 📡 Endpoints de members

### GET /api/v1/members (público)
```json
{ "data": [ ... ], "total": 3 }
```

### POST /api/v1/members (Bearer token)
```json
// body
{
  "fullName": "Camila Ruiz",
  "membershipType": "regular",
  "monthlyFee": 80000,
  "joinedAt": "2026-08-19"
}
```

### PATCH /api/v1/members/:id (Bearer token — dueño o admin)
```json
{ "membershipType": "vip", "monthlyFee": 150000 }
```

### DELETE /api/v1/members/:id (Bearer token — solo admin)
→ `204 No Content`

## 🧪 Cómo probar seguridad

1. **Helmet:** en cualquier respuesta mira `X-Content-Type-Options: nosniff`
2. **Rate limit auth:** haz 6 login seguidos → `429`
3. **RBAC 401:** DELETE sin token → `401`
4. **RBAC 403:** DELETE con token de `user` → `403`
5. **RBAC 204:** DELETE con token de `admin` → `204`
6. **CORS:** origin no permitido no recibe `Access-Control-Allow-Origin`

## 📁 Estructura

```
starter/
├── src/
│   ├── config/security.ts      # Helmet, CORS, rate limiters
│   ├── models/member.model.ts  # Modelo Club Social
│   ├── schemas/member.schema.ts
│   ├── services/member.service.ts
│   ├── controllers/member.controller.ts
│   ├── routes/member.routes.ts # RBAC aplicado
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── requireRole.ts
│   └── app.ts                  # Capas de seguridad montadas
├── docker-compose.yml
├── package.json
└── .env.example
```

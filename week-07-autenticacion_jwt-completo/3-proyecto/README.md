# 🔐 Proyecto Semana 07 — Club Social (JWT Auth)

API REST del dominio **Club Social** con autenticación completa: bcrypt, JWT access/refresh tokens y cookies HttpOnly. Todas las rutas de `members` están protegidas.

## Auth endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Registro |
| POST | `/api/v1/auth/login` | Login → accessToken + cookie refresh |
| POST | `/api/v1/auth/refresh` | Renovar access token |
| POST | `/api/v1/auth/logout` | Invalidar refresh |
| GET | `/api/v1/auth/me` | Perfil (protegido) |

## Members (todas protegidas con authMiddleware)

| Método | Ruta |
|--------|------|
| GET | `/api/v1/members` |
| GET | `/api/v1/members/:id` |
| POST | `/api/v1/members` |
| PATCH | `/api/v1/members/:id` |
| DELETE | `/api/v1/members/:id` |

### Body ejemplo POST member
```json
{
  "fullName": "Camila Ruiz",
  "membershipType": "regular",
  "monthlyFee": 80000,
  "joinedAt": "2026-08-19"
}
```

## Cómo correr

```bash
cd 3-proyecto/starter
docker compose up -d
pnpm install
cp .env.example .env
pnpm dev
```

### Seed users (al arrancar)
| Email | Password | Rol |
|-------|----------|-----|
| user@test.com | User1234! | user |
| admin@test.com | Admin1234! | admin |

### Flujo de prueba
1. POST `/auth/login` → copiar `accessToken`
2. GET `/members` sin token → 401
3. GET `/members` con `Authorization: Bearer <token>` → 200
4. CRUD completo de members
5. POST `/auth/refresh` → nuevo accessToken
6. POST `/auth/logout` → refresh invalida

# 🏛️ Semana 05 — Club Social (PostgreSQL + Prisma)

## Entidades
- **Plan** (secundaria): name, monthlyPrice, benefits
- **Member** (principal): fullName, membershipType, monthlyFee, joinedAt, email, planId → Plan

## Cómo correr

```bash
cd 3-proyecto/starter
docker compose up -d
pnpm install
cp .env.example .env
pnpm dlx prisma migrate dev --name init
pnpm db:seed
pnpm dev
```

## Endpoints
| Método | Ruta |
|--------|------|
| GET | `/api/v1/members?page=1&limit=10` |
| GET | `/api/v1/members/:id` |
| POST | `/api/v1/members` |
| PUT | `/api/v1/members/:id` |
| DELETE | `/api/v1/members/:id` |

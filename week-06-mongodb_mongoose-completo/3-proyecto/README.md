# 🏛️ Proyecto Semana 06 — Club Social (MongoDB + Mongoose)

API REST del dominio **Club Social** con dos entidades relacionadas: **Plan** (secundaria) y **Member** (principal con `populate`).

## Entidades

### Plan (secundaria)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | string (unique) | Nombre del plan |
| description | string? | Descripción |
| monthlyPrice | number | Precio mensual |
| benefits | string[] | Lista de beneficios |
| active | boolean | Activo |

### Member (principal → ref Plan)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| fullName | string | Nombre del socio |
| membershipType | regular \| vip \| honorario | Tipo |
| monthlyFee | number | Cuota |
| joinedAt | Date | Fecha ingreso |
| plan | ObjectId → Plan | Plan asociado (populate) |
| active | boolean | Activo |

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET/POST | `/api/v1/plans` | Listar / crear planes |
| GET/PUT/DELETE | `/api/v1/plans/:id` | Detalle / actualizar / eliminar |
| GET | `/api/v1/members?page=1&limit=10` | Listar con paginación + populate |
| GET/POST | `/api/v1/members` | Detalle / crear |
| PUT/DELETE | `/api/v1/members/:id` | Actualizar / eliminar |

## Cómo correr

```bash
cd 3-proyecto/starter
docker compose up -d
pnpm install
cp .env.example .env
pnpm seed
pnpm dev
```

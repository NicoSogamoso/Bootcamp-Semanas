# 🧪 Proyecto Semana 09 — Club Social (Testing)

Suite de tests para la API Club Social / members con Jest + Supertest + MongoDB Memory Server.

## Cobertura objetivo
- statements ≥ 80%
- branches ≥ 70%
- functions ≥ 80%
- lines ≥ 80%

## Tests incluidos

### Unit — `member.service.test.ts`
- findAll, findById (ok + null)
- create
- update (owner, admin, 403, not found)
- remove (ok + null)

### Unit — `auth.service.test.ts`
- register (ok + 409)
- login (ok + 401 email/password)
- getMe (ok + 404)

### Integration — `member.routes.test.ts`
- GET members vacío → 200
- POST con auth → 201
- POST inválido → 422
- POST sin token → 401
- GET by id → 200 / 404
- PATCH owner → 200
- DELETE admin → 204
- DELETE user → 403

## Cómo correr

```bash
cd 3-proyecto/starter
pnpm install
pnpm test
pnpm test:coverage
```

# 🏛️ Semana 03 — Club Social (Arquitectura en capas)

`routes → controllers → services → repositories`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/members?page=1&limit=10` | Listado paginado |
| GET | `/api/v1/members/:id` | Detalle |
| POST | `/api/v1/members` | Crear |
| PUT | `/api/v1/members/:id` | Actualizar |
| DELETE | `/api/v1/members/:id` | Eliminar |

```bash
cd 3-proyecto/starter && pnpm install && pnpm dev
```

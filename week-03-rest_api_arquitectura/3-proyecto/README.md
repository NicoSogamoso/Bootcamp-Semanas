# 🏛️ Club Social API

API REST construida con **Express + TypeScript** aplicando arquitectura en 4 capas
(`routes → controllers → services → repositories`).

## 🎯 Dominio: Club Social

Recurso principal: **members** (socios del club).

### Campos de un `Member`

| Campo            | Tipo                                  | Descripción                          |
|-------------------|----------------------------------------|---------------------------------------|
| `id`              | `number`                               | Identificador autogenerado            |
| `fullName`        | `string`                               | Nombre completo del socio              |
| `membershipType`  | `'regular' \| 'vip' \| 'honorario'`    | Tipo de membresía                     |
| `monthlyFee`      | `number`                               | Cuota mensual                         |
| `active`          | `boolean`                              | Si el socio está activo               |
| `joinedAt`        | `string` (ISO date)                    | Fecha de ingreso al club              |
| `createdAt`       | `string` (ISO datetime)                | Fecha de creación del registro        |

## 🚀 Cómo correrlo

```bash
npm install
cp .env.example .env
npm run dev
```

El servidor queda en `http://localhost:3000`.

## 📡 Endpoints

| Método | Ruta                       | Status | Descripción                    |
|--------|-----------------------------|--------|----------------------------------|
| GET    | `/api/v1/members`           | 200    | Lista paginada `?page&limit`    |
| GET    | `/api/v1/members/:id`       | 200    | Obtener un socio por id          |
| POST   | `/api/v1/members`           | 201    | Crear un socio nuevo             |
| PUT    | `/api/v1/members/:id`       | 200    | Actualizar un socio               |
| DELETE | `/api/v1/members/:id`       | 204    | Eliminar un socio                |

### Ejemplos

**GET /api/v1/members?page=1&limit=2**
```json
{
  "data": [
    { "id": 1, "fullName": "Laura Gómez", "membershipType": "vip", "monthlyFee": 150000, "active": true, "joinedAt": "2022-01-10", "createdAt": "2022-01-10T09:00:00.000Z" }
  ],
  "total": 3,
  "page": 1,
  "limit": 2
}
```

**POST /api/v1/members**
```json
// body
{ "fullName": "Camila Ruiz", "membershipType": "regular", "monthlyFee": 80000, "joinedAt": "2026-08-19" }

// respuesta 201
{ "data": { "id": 4, "fullName": "Camila Ruiz", "membershipType": "regular", "monthlyFee": 80000, "active": true, "joinedAt": "2026-08-19", "createdAt": "2026-08-19T20:28:55.386Z" } }
```

**GET /api/v1/members/999 (no existe)**
```json
// respuesta 404
{ "error": "Not Found", "message": "Member 999 not found" }
```

## 🏗️ Arquitectura

- **repositories/**: única capa que toca el store en memoria. Métodos `async`, devuelve copias defensivas.
- **services/**: lógica de negocio (paginación, validaciones). Sin imports de Express.
- **controllers/**: 3 pasos — extraer de `req`, llamar service, responder con `res`.
- **routes/**: solo mapeo URL → función del controller.

## ✅ Verificación

```bash
npm run build   # compila sin errores TypeScript
```

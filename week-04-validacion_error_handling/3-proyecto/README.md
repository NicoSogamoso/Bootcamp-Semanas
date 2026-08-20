# Proyecto Semana 04 — Validación, Errores y Logging

## Dominio asignado

**Club Social** — Recurso principal: `Member` (Socio)

Se adaptó el starter genérico (`Item`) al dominio de un club social, donde el recurso
gestionado son los **socios** del club, incluyendo su tipo de membresía y cuota mensual.

## Recurso principal: Member

| Campo | Tipo | Validación (Zod) |
|---|---|---|
| `name` | `string` | Mínimo 1 carácter, `.trim()` |
| `email` | `string` | Formato de email válido, `.trim()` |
| `membershipType` | `enum` | Solo permite `"basica"`, `"premium"` o `"vip"` |
| `monthlyFee` | `number` | Debe ser positivo (`> 0`) |
| `active` | `boolean` | Opcional, `default: true` (solo en creación) |
| `joinedAt` | `date` | Opcional, `default: fecha actual` (solo en creación) |

En las actualizaciones (`PUT`) todos los campos son opcionales y **no llevan valores por
defecto**, para evitar que un campo ausente en el body sobrescriba datos existentes del
socio (por ejemplo, `joinedAt` o `active`).

Además de la validación de tipos, el servicio (`members.service.ts`) valida que el
**email sea único**, lanzando un `AppError(409, ...)` si ya existe un socio registrado
con ese correo, tanto al crear como al actualizar.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/v1/members` | Listar socios con paginación (`page`, `limit`) |
| `GET` | `/api/v1/members/:id` | Obtener un socio por id |
| `POST` | `/api/v1/members` | Crear un nuevo socio |
| `PUT` | `/api/v1/members/:id` | Actualizar un socio (campos opcionales) |
| `DELETE` | `/api/v1/members/:id` | Eliminar un socio |

## Manejo de errores

- **400** — Error de validación (Zod), ya sea en el body o en el parámetro `:id`.
  Responde con `issues[]` detallando el campo y el mensaje de cada error.
- **404** — Socio no encontrado, o ruta inexistente (`notFound` middleware).
- **409** — Conflicto: ya existe un socio con ese email.
- **500** — Error interno no controlado. En desarrollo incluye el `stack`; en
  producción lo oculta.

## Logging

- **Winston** configurado en `src/config/logger.ts`:
  - Nivel `http` en desarrollo, `warn` en producción.
  - Formato colorizado con timestamp en desarrollo, JSON en producción.
  - Archivo `logs/error.log` solo en producción (nivel `error`).
- **Morgan** integrado como middleware, enviando sus logs a Winston (`logger.http`).
- `logger.info()` al iniciar el servidor.
- `logger.warn()` en el `errorHandler` para errores operacionales (`AppError`).
- `logger.error()` para errores no controlados.

## Arquitectura

```
Rutas → Controladores → Servicios → Repositorio
```

Toda la lógica de negocio (validación de duplicados, lanzar `AppError`) vive en
`members.service.ts`. El controlador solo valida con Zod, llama al servicio y arma la
respuesta HTTP.

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
pnpm install

# Levantar en modo desarrollo (watch)
pnpm dev

# Compilar a producción
pnpm build
pnpm start
```

El servidor corre por defecto en `http://localhost:3000`.

## Pruebas realizadas

- `POST /api/v1/members` con body inválido → **400** con `issues[]` por campo.
- `GET /api/v1/members/:id` con id no numérico (`/abc`) → **400**.
- `GET /api/v1/members/:id` con id inexistente (`/999`) → **404**.
- `GET /ruta-inexistente` → **404** en formato JSON (no HTML).
- `PUT /api/v1/members/:id` parcial → actualiza solo los campos enviados, sin afectar
  `joinedAt` ni `active` si no se incluyen en el body.
- `DELETE /api/v1/members/:id` → **204 No Content**.
- Logs de Winston + Morgan visibles en consola durante todas las peticiones.
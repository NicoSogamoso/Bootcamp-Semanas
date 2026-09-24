# 🏛️ Proyecto Semana 01 — Club Social (Procesador de datos)

CLI en **Node.js + TypeScript** que lee socios desde JSON, calcula un resumen y genera un reporte.

## Dominio: Club Social

Recurso: **Member** (socio)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador |
| `fullName` | string | Nombre completo |
| `membershipType` | `regular` \| `vip` \| `honorario` | Tipo de membresía |
| `monthlyFee` | number | Cuota mensual |
| `active` | boolean | Activo / inactivo |
| `joinedYear` | number | Año de ingreso |

## Cómo correr

```bash
cd 3-proyecto/starter
pnpm install

# Todos los socios
pnpm dev

# Filtrar por tipo de membresía
pnpm dev -- --category vip
pnpm dev -- --category regular
pnpm dev -- --category honorario

# Verificar TypeScript
pnpm build
```

## Qué hace

1. Lee `data/members.json` (12 socios)
2. Filtra por `--category` (membershipType) si se pasa
3. Calcula: total, activos/inactivos, cuota promedio, más cara/barata, tipos únicos
4. Escribe `output/report.json`
5. Maneja errores (archivo inexistente, categoría inválida)

## Estructura

```
starter/
├── data/members.json
├── src/
│   ├── types.ts       # Member, MemberSummary, Report
│   ├── reader.ts      # fs/promises readFile
│   ├── processor.ts   # filter + summary
│   ├── writer.ts      # writeFile report
│   └── index.ts       # CLI entry point
├── output/            # generado al correr
├── package.json
└── tsconfig.json
```

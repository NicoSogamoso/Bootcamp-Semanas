"use strict";
// ============================================================
// app.ts
// Configura la aplicación Express: middlewares, rutas y el
// manejador central de errores. NO levanta el servidor aquí
// (eso pasa en server.ts) para poder testear "app" sin abrir
// un puerto real.
// ============================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const members_routes_1 = __importDefault(require("./routes/members.routes"));
const members_service_1 = require("./services/members.service");
const app = (0, express_1.default)();
// Permite que Express entienda JSON en el body de las requests.
app.use(express_1.default.json());
// Todas las rutas de socios cuelgan de /api/v1/members
app.use('/api/v1/members', members_routes_1.default);
// Ruta de salud simple, útil para probar que el server está vivo.
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
// 404 para cualquier ruta no definida.
app.use((_req, res) => {
    const body = { error: 'Not Found', message: 'Route not found' };
    res.status(404).json(body);
});
// Manejador central de errores. Cualquier next(err) del controller
// termina aquí. Así centralizamos el formato de errores en un solo lugar.
app.use((err, _req, res, _next) => {
    if (err instanceof members_service_1.ServiceError) {
        const body = {
            error: err.status === 404 ? 'Not Found' : 'Bad Request',
            message: err.message,
        };
        res.status(err.status).json(body);
        return;
    }
    console.error(err);
    const body = { error: 'Internal Server Error', message: 'Something went wrong' };
    res.status(500).json(body);
});
exports.default = app;

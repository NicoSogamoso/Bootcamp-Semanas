"use strict";
// ============================================================
// members.controller.ts
// Cada función hace SOLO 3 pasos:
//   1) extraer datos de la request (params, query, body)
//   2) llamar al service
//   3) responder con res.status(...).json(...)
// Ningún cálculo de negocio va aquí. Si algo falla, se lo
// pasamos a next(err) y lo resuelve el manejador de errores.
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersController = void 0;
const members_service_1 = require("../services/members.service");
exports.membersController = {
    // GET /api/v1/members?page=1&limit=10
    async list(req, res, next) {
        try {
            // 1) extraer
            const page = req.query.page ? Number(req.query.page) : undefined;
            const limit = req.query.limit ? Number(req.query.limit) : undefined;
            // 2) llamar service
            const result = await members_service_1.membersService.list(page, limit);
            // 3) responder
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    },
    // GET /api/v1/members/:id
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const member = await members_service_1.membersService.getById(id);
            res.status(200).json({ data: member });
        }
        catch (err) {
            next(err);
        }
    },
    // POST /api/v1/members
    async create(req, res, next) {
        try {
            const input = req.body;
            const member = await members_service_1.membersService.create(input);
            res.status(201).json({ data: member });
        }
        catch (err) {
            next(err);
        }
    },
    // PUT /api/v1/members/:id
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const input = req.body;
            const member = await members_service_1.membersService.update(id, input);
            res.status(200).json({ data: member });
        }
        catch (err) {
            next(err);
        }
    },
    // DELETE /api/v1/members/:id
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            await members_service_1.membersService.delete(id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },
};

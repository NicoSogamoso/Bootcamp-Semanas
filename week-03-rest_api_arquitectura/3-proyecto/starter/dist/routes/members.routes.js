"use strict";
// ============================================================
// members.routes.ts
// SOLO mapea "método HTTP + URL" -> función del controller.
// No hay lógica aquí, ni siquiera un if.
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const members_controller_1 = require("../controllers/members.controller");
const router = (0, express_1.Router)();
router.get('/', members_controller_1.membersController.list);
router.get('/:id', members_controller_1.membersController.getById);
router.post('/', members_controller_1.membersController.create);
router.put('/:id', members_controller_1.membersController.update);
router.delete('/:id', members_controller_1.membersController.delete);
exports.default = router;

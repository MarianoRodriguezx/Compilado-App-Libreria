"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const HttpExceptionHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/HttpExceptionHandler"));
class ExceptionHandler extends HttpExceptionHandler_1.default {
    constructor() {
        super(Logger_1.default);
    }
    async handle(error, ctx) {
        if (error.code === 'E_VALIDATION_FAILURE') {
            return ctx.response.status(400).send({
                status: false,
                message: 'Error de validación',
                data: error.messages
            });
        }
        if (+error.status === 500) {
            return ctx.response.status(500).send({
                status: false,
                message: 'Error interno en el servidor. Contacta a soporte para continuar.',
                data: error
            });
        }
        if (error.code === 'E_ROUTE_NOT_FOUND') {
            return ctx.response.status(404).send({
                status: false,
                message: 'Ruta no encontrada',
                data: error
            });
        }
        return super.handle(error, ctx);
    }
}
exports.default = ExceptionHandler;
//# sourceMappingURL=Handler.js.map
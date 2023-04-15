"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
class GeneratedTokensController {
    async generateToken({ session, response, auth }) {
        try {
            const generatedToken = (0, Helpers_1.cuid)();
            const tokenData = {
                generated_by: auth.user.id,
                used_email: 'No canjeado',
                token: generatedToken,
                linked_table: 'No canjeado',
                type: +auth.user.role === +User_1.default.SUPERVISOR.id ? GeneratedToken_1.default.EDIT.id : GeneratedToken_1.default.DELETE.id
            };
            await GeneratedToken_1.default.create(tokenData);
            console.log(generatedToken);
            return true;
        }
        catch (e) {
            console.log(e);
            session.flash('form', 'Formulario inválido');
            return response.redirect().back();
        }
    }
    async forceTokenEdit({}) {
        try {
            const generatedToken = (0, Helpers_1.cuid)();
            const tokenData = {
                generated_by: 1,
                used_email: 'No canjeado',
                token: generatedToken,
                linked_table: 'No canjeado',
                type: GeneratedToken_1.default.EDIT.id
            };
            await GeneratedToken_1.default.create(tokenData);
            console.log(generatedToken);
            return generatedToken;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    async forceTokenDelete({}) {
        try {
            const generatedToken = (0, Helpers_1.cuid)();
            const tokenData = {
                generated_by: 1,
                used_email: 'No canjeado',
                token: generatedToken,
                linked_table: 'No canjeado',
                type: GeneratedToken_1.default.DELETE.id
            };
            await GeneratedToken_1.default.create(tokenData);
            console.log(generatedToken);
            return generatedToken;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
}
exports.default = GeneratedTokensController;
//# sourceMappingURL=GeneratedTokensController.js.map
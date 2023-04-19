"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
class GeneratedTokensController {
    async generateToken({ session, response, auth }) {
        try {
            const generatedToken = (0, Helpers_1.cuid)();
            const tokenType = +auth.user.role === +User_1.default.SUPERVISOR.id ? GeneratedToken_1.default.EDIT.id : GeneratedToken_1.default.DELETE.id;
            const tokenData = {
                generated_by: auth.user.id,
                used_email: 'No canjeado',
                token: generatedToken,
                linked_table: 'No canjeado',
                type: tokenType
            };
            await GeneratedToken_1.default.create(tokenData);
            console.log(generatedToken);
            session.flash('success', `Token para ${+tokenType === +GeneratedToken_1.default.EDIT.id ? "EDITAR" : "ELIMINAR"}: ${generatedToken}`);
            return response.redirect().back();
        }
        catch (e) {
            console.log(e);
            session.flash('success', 'Formulario inválido');
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
    async index({ auth, view }) {
        const tokens = await GeneratedToken_1.default.query()
            .preload('generatedBy')
            .orderBy('id', 'desc');
        const data = {
            list: tokens,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/tokens/index', data);
    }
}
exports.default = GeneratedTokensController;
//# sourceMappingURL=GeneratedTokensController.js.map
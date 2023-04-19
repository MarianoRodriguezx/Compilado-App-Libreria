"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Editorial_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Editorial"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const TokenValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Tokens/TokenValidator"));
const StoreEditorialValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Editorial/StoreEditorialValidator"));
const UpdateEditorialValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Editorial/UpdateEditorialValidator"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
class EditorialsController {
    async index({ auth, view }) {
        const editorials = await Editorial_1.default.query()
            .orderBy('id', 'desc');
        const data = {
            list: editorials,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/editorials/index', data);
    }
    async create({ auth, view }) {
        const data = {
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/editorials/create', data);
    }
    async show({ auth, view, params }) {
        const editorial = await Editorial_1.default.findOrFail(params.id);
        const data = {
            item: editorial,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/editorials/show', data);
    }
    async edit({ auth, view, params }) {
        const editorial = await Editorial_1.default.findOrFail(params.id);
        const data = {
            item: editorial,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/editorials/edit', data);
    }
    async getActiveEditorials({ auth }) {
        const editorials = await Editorial_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const data = {
            list: editorials,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return data;
    }
    async store({ request, session, response }) {
        try {
            await request.validate(StoreEditorialValidator_1.default);
            const authorData = request.only(Editorial_1.default.store);
            await Editorial_1.default.create(authorData);
            session.flash('form', 'Editorial editada correctamente');
            return response.redirect().back();
        }
        catch (e) {
            console.log(e);
            session.flash('form', 'Formulario inválido');
            return response.redirect().back();
        }
    }
    async update({ request, session, response, params, auth }) {
        try {
            await request.validate(UpdateEditorialValidator_1.default);
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.SUPERVISOR.id || await this.useToken(GeneratedToken_1.default.EDIT.id, editToken, auth.user.email)) {
                const authorData = request.only(Editorial_1.default.store);
                const editorial = await Editorial_1.default.findOrFail(params.id);
                await editorial.merge(authorData);
                await editorial.save();
                session.flash('form', 'Editorial editada correctamente');
                return response.redirect().back();
            }
            else {
                session.flash('form', 'Token inválido');
                return response.redirect().back();
            }
        }
        catch (e) {
            console.log(e);
            session.flash('form', 'Formulario inválido');
            return response.redirect().back();
        }
    }
    async destroy({ request, params, session, response, auth }) {
        try {
            await request.validate(TokenValidator_1.default);
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.ADMIN.id || await this.useToken(GeneratedToken_1.default.DELETE.id, editToken, auth.user.email)) {
                const editorial = await Editorial_1.default.findOrFail(params.id);
                editorial.status = !editorial.status;
                await editorial.save();
                session.flash('form', 'Editorial eliminada correctamente');
                return response.redirect().back();
            }
            else {
                session.flash('form', 'Token inválido');
                return response.redirect().back();
            }
        }
        catch (e) {
            console.log(e);
            session.flash('form', 'Formulario inválido');
            return response.redirect().back();
        }
    }
    async useToken(type, token, email) {
        try {
            const generatedToken = await GeneratedToken_1.default.findByOrFail('token', token);
            if (!generatedToken.status || generatedToken.type !== type) {
                return false;
            }
            else {
                generatedToken.status = false;
                generatedToken.used_email = email;
                generatedToken.linked_table = 'Editoriales';
                await generatedToken.save();
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = EditorialsController;
//# sourceMappingURL=EditorialsController.js.map
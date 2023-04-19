"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const TokenValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Tokens/TokenValidator"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UpdateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/User/UpdateUserValidator"));
const StoreUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/User/StoreUserValidator"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
class UsersController {
    async index({ auth, view }) {
        const users = await User_1.default.query()
            .orderBy('id', 'desc');
        const data = {
            list: users,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/users/index', data);
    }
    async create({ auth, view }) {
        const data = {
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/users/create', data);
    }
    async show({ auth, view, params }) {
        const user = await User_1.default.findOrFail(params.id);
        const data = {
            item: user,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/users/show', data);
    }
    async edit({ auth, view, params }) {
        const user = await User_1.default.findOrFail(params.id);
        const data = {
            item: user,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/users/edit', data);
    }
    async getActiveUsers({ auth }) {
        const users = await User_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const data = {
            list: users,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return data;
    }
    async store({ request, session, response }) {
        try {
            await request.validate(StoreUserValidator_1.default);
            const authorData = request.only(User_1.default.store);
            await User_1.default.create(authorData);
            session.flash('form', 'User editada correctamente');
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
            await request.validate(UpdateUserValidator_1.default);
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.SUPERVISOR.id || await this.useToken(GeneratedToken_1.default.EDIT.id, editToken, auth.user.email)) {
                const authorData = request.only(User_1.default.store);
                const user = await User_1.default.findOrFail(params.id);
                await user.merge(authorData);
                await user.save();
                session.flash('form', 'User editada correctamente');
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
                const user = await User_1.default.findOrFail(params.id);
                user.status = !user.status;
                await user.save();
                session.flash('form', 'User eliminada correctamente');
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
                generatedToken.linked_table = 'Usuarios';
                await generatedToken.save();
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map
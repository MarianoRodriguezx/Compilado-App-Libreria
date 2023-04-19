"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Author_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Author"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const TokenValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Tokens/TokenValidator"));
const StoreAuthorValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Author/StoreAuthorValidator"));
const UpdateAuthorValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Author/UpdateAuthorValidator"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
class AuthorsController {
    async index({ auth, view }) {
        const authors = await Author_1.default.query()
            .orderBy('id', 'desc');
        const data = {
            list: authors,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/authors/index', data);
    }
    async create({ auth, view }) {
        const data = {
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/authors/create', data);
    }
    async show({ auth, view, params }) {
        const author = await Author_1.default.findOrFail(params.id);
        const data = {
            item: author,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/authors/show', data);
    }
    async edit({ auth, view, params }) {
        const author = await Author_1.default.findOrFail(params.id);
        const data = {
            item: author,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/authors/edit', data);
    }
    async getActiveAuthors({ auth }) {
        const authors = await Author_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const data = {
            list: authors,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return data;
    }
    async store({ request, session, response }) {
        try {
            await request.validate(StoreAuthorValidator_1.default);
            const authorData = request.only(Author_1.default.store);
            await Author_1.default.create(authorData);
            session.flash('form', 'Autor editada correctamente');
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
            await request.validate(UpdateAuthorValidator_1.default);
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.SUPERVISOR.id || await this.useToken(GeneratedToken_1.default.EDIT.id, editToken, auth.user.email)) {
                const authorData = request.only(Author_1.default.store);
                const author = await Author_1.default.findOrFail(params.id);
                await author.merge(authorData);
                await author.save();
                session.flash('form', 'Autor editada correctamente');
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
                const author = await Author_1.default.findOrFail(params.id);
                author.status = !author.status;
                await author.save();
                session.flash('form', 'Autor eliminada correctamente');
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
                generatedToken.linked_table = 'Autores';
                await generatedToken.save();
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = AuthorsController;
//# sourceMappingURL=AuthorsController.js.map
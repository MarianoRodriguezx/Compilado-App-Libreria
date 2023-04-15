"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const TokenValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Tokens/TokenValidator"));
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Book_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Book"));
const StoreBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Book/StoreBookValidator"));
const UpdateBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Book/UpdateBookValidator"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
class BooksController {
    async index({ auth, view }) {
        const books = await Book_1.default.query()
            .orderBy('id', 'asc');
        const data = {
            list: books,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/books/index', data);
    }
    async create({ auth, view }) {
        const data = {
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/books/create', data);
    }
    async show({ auth, view, params }) {
        const book = await Book_1.default.findOrFail(params.id);
        const data = {
            item: book,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/books/show', data);
    }
    async edit({ auth, view, params }) {
        const book = await Book_1.default.findOrFail(params.id);
        const data = {
            item: book,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/books/edit', data);
    }
    async getActiveBooks({ auth }) {
        const books = await Book_1.default.query()
            .where('status', true)
            .orderBy('id', 'asc');
        const data = {
            list: books,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return data;
    }
    async store({ request, session, response }) {
        try {
            await request.validate(StoreBookValidator_1.default);
            const categoryData = request.only(Book_1.default.store);
            await Book_1.default.create(categoryData);
            session.flash('form', 'Libro guardado correctamente');
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
            await request.validate(UpdateBookValidator_1.default);
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.SUPERVISOR.id || await this.useToken(GeneratedToken_1.default.EDIT.id, editToken, auth.user.email)) {
                const categoryData = request.only(Book_1.default.store);
                const book = await Book_1.default.findOrFail(params.id);
                await book.merge(categoryData);
                await book.save();
                session.flash('form', 'Libro editado correctamente');
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
                const book = await Book_1.default.findOrFail(params.id);
                book.status = !book.status;
                await book.save();
                session.flash('form', 'Libro eliminada correctamente');
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
                generatedToken.linked_table = 'Libros';
                await generatedToken.save();
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = BooksController;
//# sourceMappingURL=BooksController.js.map
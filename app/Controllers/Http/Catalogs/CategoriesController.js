"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Category"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const StoreCategoryValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Category/StoreCategoryValidator"));
const TokenValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Tokens/TokenValidator"));
const UpdateCategoryValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Category/UpdateCategoryValidator"));
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
class CategoriesController {
    async index({ auth, view }) {
        const categories = await Category_1.default.query()
            .orderBy('id', 'desc');
        const data = {
            list: categories,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/categories/index', data);
    }
    async create({ auth, view }) {
        const data = {
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/categories/create', data);
    }
    async show({ auth, view, params }) {
        const category = await Category_1.default.findOrFail(params.id);
        const data = {
            item: category,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/categories/show', data);
    }
    async edit({ auth, view, params }) {
        const category = await Category_1.default.findOrFail(params.id);
        const data = {
            item: category,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return view.render('pages/catalogs/categories/edit', data);
    }
    async getActiveCategories({ auth }) {
        const categories = await Category_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const data = {
            list: categories,
            isPrivate: isPrivate,
            role: auth.user?.role
        };
        return data;
    }
    async store({ request, session, response }) {
        try {
            await request.validate(StoreCategoryValidator_1.default);
            const categoryData = request.only(Category_1.default.store);
            await Category_1.default.create(categoryData);
            session.flash('form', 'Categoría editada correctamente');
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
            await request.validate(UpdateCategoryValidator_1.default);
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.SUPERVISOR.id || await this.useToken(GeneratedToken_1.default.EDIT.id, editToken, auth.user.email)) {
                const categoryData = request.only(Category_1.default.store);
                const category = await Category_1.default.findOrFail(params.id);
                await category.merge(categoryData);
                await category.save();
                session.flash('form', 'Categoría editada correctamente');
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
                const category = await Category_1.default.findOrFail(params.id);
                category.status = !category.status;
                await category.save();
                session.flash('form', 'Categoría eliminada correctamente');
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
                generatedToken.linked_table = 'Categorías';
                await generatedToken.save();
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = CategoriesController;
//# sourceMappingURL=CategoriesController.js.map
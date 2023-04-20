"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Tokens/TokenValidator"));
const GeneratedToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokens/GeneratedToken"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Book_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Book"));
const StoreBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Book/StoreBookValidator"));
const UpdateBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Catalogs/Book/UpdateBookValidator"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const fs_1 = __importDefault(require("fs"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Author_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Author"));
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Category"));
const Editorial_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Editorial"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
const fileDriverPath = `${Env_1.default.get('S3_ENDPOINT')}${Env_1.default.get('S3_BUCKET')}`;
class BooksController {
    async index({ auth, view }) {
        const books = await Book_1.default.query()
            .preload('postedBy')
            .preload('author')
            .preload('category')
            .preload('editorial')
            .where('status', true)
            .orderBy('id', 'desc');
        const authors = await Author_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const categories = await Category_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const editoriales = await Editorial_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const data = {
            list: books,
            isPrivate: isPrivate,
            role: auth.user?.role,
            spacesPath: fileDriverPath,
            authors: authors,
            categories: categories,
            editoriales: editoriales,
            showAll: false
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
        const book = await Book_1.default.query()
            .where('id', params.id)
            .preload('postedBy')
            .preload('author')
            .preload('category')
            .preload('editorial')
            .firstOrFail();
        const authors = await Author_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const categories = await Category_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const editoriales = await Editorial_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const data = {
            item: book,
            isPrivate: isPrivate,
            role: auth.user?.role,
            spacesPath: fileDriverPath,
            authors: authors,
            categories: categories,
            editoriales: editoriales
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
    async getActiveBooks({ auth, view }) {
        const books = await Book_1.default.query()
            .preload('postedBy')
            .preload('author')
            .preload('category')
            .preload('editorial')
            .orderBy('id', 'desc');
        const authors = await Author_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const categories = await Category_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const editoriales = await Editorial_1.default.query()
            .where('status', true)
            .orderBy('id', 'desc');
        const data = {
            list: books,
            isPrivate: isPrivate,
            role: auth.user?.role,
            spacesPath: fileDriverPath,
            authors: authors,
            categories: categories,
            editoriales: editoriales,
            showAll: true
        };
        return view.render('pages/catalogs/books/index', data);
    }
    async store({ request, session, response, auth }) {
        try {
            console.log(request.input("description"));
            console.log(request.input("image_file"));
            console.log(request.input("pdf_file"));
            const bookValidation = await request.validate(StoreBookValidator_1.default);
            const myImage = bookValidation.image_file;
            const myPDF = bookValidation.pdf_file;
            const bookData = request.only(Book_1.default.store);
            const imageBasePath = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/images/' : 'oficial/images/';
            const pdfBasePath = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/pdf/' : 'oficial/pdf/';
            const filename = (0, Helpers_1.cuid)();
            const imagePath = `${imageBasePath}${filename}.${myImage.extname}`;
            const pdfPath = `${pdfBasePath}${filename}.${myPDF.extname}`;
            await myImage.move(Application_1.default.tmpPath('uploads'), {
                name: `${filename}.${myImage.extname}`,
                overwrite: true
            });
            await Drive_1.default.putStream(imagePath, fs_1.default.createReadStream(Application_1.default.tmpPath(`uploads/${filename}.${myImage.extname}`)), {});
            await myPDF.move(Application_1.default.tmpPath('uploads'), {
                name: `${filename}.${myPDF.extname}`,
                overwrite: true
            });
            await Drive_1.default.putStream(pdfPath, fs_1.default.createReadStream(Application_1.default.tmpPath(`uploads/${filename}.${myPDF.extname}`)), {});
            const dataMerged = {
                ...bookData,
                posted_by: auth.user.id,
                book_path: pdfPath,
                cover_path: imagePath
            };
            console.log(dataMerged);
            await Book_1.default.create(dataMerged);
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
                const bookData = request.only(Book_1.default.update);
                const book = await Book_1.default.findOrFail(params.id);
                await book.merge(bookData);
                await book.save();
                session.flash('success', 'Libro editado correctamente');
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
                session.flash('success', 'Libro actulizado correctamente');
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
    async updateCover({ request, session, response, params, auth }) {
        try {
            const book = await Book_1.default.findOrFail(params.id);
            const filename = book.cover_path.split('/').pop()?.split('.')[0];
            const imageDataSchema = Validator_1.schema.create({
                image_file: Validator_1.schema.file({
                    size: '10mb',
                    extnames: ['jpg', 'jpeg', 'gif', 'png'],
                })
            });
            const imageData = await request.validate({ schema: imageDataSchema });
            const myImage = imageData.image_file;
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.SUPERVISOR.id || await this.useToken(GeneratedToken_1.default.EDIT.id, editToken, auth.user.email)) {
                if (await Drive_1.default.exists(book.cover_path)) {
                    await Drive_1.default.delete(book.cover_path);
                }
                const imageBasePath = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/images/' : 'oficial/images/';
                const imagePath = `${imageBasePath}${filename}.${myImage.extname}`;
                await myImage.move(Application_1.default.tmpPath('uploads'), {
                    name: `${filename}.${myImage.extname}`,
                    overwrite: true
                });
                await Drive_1.default.putStream(imagePath, fs_1.default.createReadStream(Application_1.default.tmpPath(`uploads/${filename}.${myImage.extname}`)), {});
                book.cover_path = imagePath;
                await book.save();
                session.flash('success', 'Portada editada correctamente');
                return response.redirect().back();
            }
            else {
                session.flash('form', 'Token inválido');
                return response.redirect().back();
            }
        }
        catch (e) {
            console.log(e);
            session.flash('form', 'Archivo inválido');
            return response.redirect().back();
        }
    }
    async updatePdf({ request, session, response, params, auth }) {
        try {
            const book = await Book_1.default.findOrFail(params.id);
            const filename = book.book_path.split('/').pop()?.split('.')[0];
            const pdfDataSchema = Validator_1.schema.create({
                pdf_file: Validator_1.schema.file({
                    size: '50mb',
                    extnames: ['pdf'],
                })
            });
            const pdfData = await request.validate({ schema: pdfDataSchema });
            const myPdf = pdfData.pdf_file;
            const editToken = request.input("edit_token");
            if (+auth.user.role === +User_1.default.SUPERVISOR.id || await this.useToken(GeneratedToken_1.default.EDIT.id, editToken, auth.user.email)) {
                if (await Drive_1.default.exists(book.book_path)) {
                    await Drive_1.default.delete(book.book_path);
                }
                const imageBasePath = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/pdf/' : 'oficial/pdf/';
                const pdfPath = `${imageBasePath}${filename}.${myPdf.extname}`;
                await myPdf.move(Application_1.default.tmpPath('uploads'), {
                    name: `${filename}.${myPdf.extname}`,
                    overwrite: true
                });
                await Drive_1.default.putStream(pdfPath, fs_1.default.createReadStream(Application_1.default.tmpPath(`uploads/${filename}.${myPdf.extname}`)), {});
                book.book_path = pdfPath;
                await book.save();
                session.flash('success', 'Libro guardado correctamente');
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
}
exports.default = BooksController;
//# sourceMappingURL=BooksController.js.map
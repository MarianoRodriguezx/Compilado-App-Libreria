"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.resource('books', 'BooksController');
    Route_1.default.get('get/active/books', 'BooksController.getActiveBooks');
    Route_1.default.put('books/update/cover/:id', 'BooksController.updateCover');
    Route_1.default.put('books/update/pdf/:id', 'BooksController.updatePdf');
})
    .namespace('App/Controllers/Http/Catalogs')
    .middleware(['auth', 'verifyUser']);
//# sourceMappingURL=book.js.map
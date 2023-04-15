"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
require("./modules/api/auth");
require("./modules/api/mail");
require("./modules/api/qr");
require("./modules/api/file");
require("./modules/api/token");
require("./modules/view/auth");
require("./modules/view/catalogs/category");
require("./modules/view/catalogs/book");
require("./modules/view/catalogs/author");
require("./modules/view/catalogs/editorial");
require("./modules/view/catalogs/user");
Route_1.default.get('/dashboard', async ({ view }) => {
    return view.render('pages/dashboard');
}).middleware(['auth', 'verifyUser']);
Route_1.default.on('/').redirect('/login');
Route_1.default.get('/not-found', async ({ view }) => {
    return view.render('errors/not-found');
});
Route_1.default.get('/test', async ({ response }) => {
    return response.ok({ data: 'funciona' });
});
//# sourceMappingURL=routes.js.map
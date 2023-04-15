"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/login', async ({ view, auth, response }) => {
    return !auth.use('web').isLoggedIn ? view.render('pages/page_login') : response.redirect('/dashboard');
}).middleware(['silenthAuth']);
//# sourceMappingURL=auth.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
require("./modules/api/auth");
require("./modules/view/auth");
Route_1.default.get('/welcome', async ({ view }) => {
    return view.render('welcome');
});
Route_1.default.on('/').redirect('/login');
Route_1.default.get('/test', async ({ response }) => {
    return response.ok({ data: 'funciona' });
});
//# sourceMappingURL=routes.js.map
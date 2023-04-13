"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('login', 'AuthController.login').as('login');
    Route_1.default.post('register', 'AuthController.register');
})
    .namespace('App/Controllers/Http/Auth').prefix('api');
Route_1.default.group(() => {
    Route_1.default.post('logout', 'AuthController.logout');
    Route_1.default.get('profile', 'AuthController.profile');
})
    .namespace('App/Controllers/Http/Auth').prefix('api').middleware(['auth']);
//# sourceMappingURL=auth.js.map
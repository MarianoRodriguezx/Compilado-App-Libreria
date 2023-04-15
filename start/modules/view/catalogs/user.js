"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.resource('users', 'UsersController');
    Route_1.default.get('get/active/users', 'UsersController.getActiveUsers');
})
    .namespace('App/Controllers/Http/Catalogs')
    .middleware(['auth', 'adminRole']);
//# sourceMappingURL=user.js.map
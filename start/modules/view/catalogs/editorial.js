"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.resource('editorials', 'EditorialsController');
    Route_1.default.get('get/active/editorials', 'EditorialsController.getActiveEditorials');
})
    .namespace('App/Controllers/Http/Catalogs')
    .middleware(['auth']);
//# sourceMappingURL=editorial.js.map
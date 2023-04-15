"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('generate/qr', 'QRController.generateQR').as('generateQR');
})
    .namespace('App/Controllers/Http/Helpers').middleware(['auth', 'signedRoute']);
Route_1.default.group(() => {
    Route_1.default.post('submit/qr', 'QRController.submitQR').as('submitQR');
})
    .namespace('App/Controllers/Http/Helpers').middleware(['auth']);
Route_1.default.group(() => {
    Route_1.default.post('force/qr', 'QRController.forceQr').as('forceQr');
})
    .namespace('App/Controllers/Http/Helpers');
//# sourceMappingURL=qr.js.map
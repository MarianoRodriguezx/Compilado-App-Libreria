"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('sendMail', 'MailController.sendMail').as('sendMail');
})
    .namespace('App/Controllers/Http/Helpers').middleware(['auth', 'signedRoute']);
Route_1.default.group(() => {
    Route_1.default.post('submitCode', 'MailController.submitCode').as('submitCode');
})
    .namespace('App/Controllers/Http/Helpers').middleware(['auth']);
//# sourceMappingURL=mail.js.map
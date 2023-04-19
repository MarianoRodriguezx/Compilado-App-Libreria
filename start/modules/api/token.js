"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('generate/token', 'GeneratedTokensController.generateToken').as('generateToken');
    Route_1.default.get('tokens', 'GeneratedTokensController.index').as('index');
})
    .namespace('App/Controllers/Http/Tokens').middleware(['auth', 'verifyUser', 'privilegeRole']);
;
Route_1.default.group(() => {
    Route_1.default.post('generate/token/f/edit', 'GeneratedTokensController.forceTokenEdit').as('forceTokenEdit');
    Route_1.default.post('generate/token/f/delete', 'GeneratedTokensController.forceTokenDelete').as('forceTokenDelete');
})
    .namespace('App/Controllers/Http/Tokens');
//# sourceMappingURL=token.js.map
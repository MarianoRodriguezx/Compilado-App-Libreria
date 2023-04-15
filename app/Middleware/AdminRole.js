"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AdminRole {
    async handle({ auth, response }, next) {
        if (+auth.user.role !== User_1.default.ADMIN.id) {
            return response.redirect('/dashboard');
        }
        await next();
    }
}
exports.default = AdminRole;
//# sourceMappingURL=AdminRole.js.map
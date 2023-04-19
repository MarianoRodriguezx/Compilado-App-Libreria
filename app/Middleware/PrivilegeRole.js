"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class PrivilegeRole {
    async handle({ auth, response }, next) {
        if (![User_1.default.ADMIN.id, User_1.default.SUPERVISOR.id].includes(+auth.user.role)) {
            return response.redirect('/dashboard');
        }
        await next();
    }
}
exports.default = PrivilegeRole;
//# sourceMappingURL=PrivilegeRole.js.map
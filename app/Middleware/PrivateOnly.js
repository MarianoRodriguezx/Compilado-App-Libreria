"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const isPrivate = Env_1.default.get('IS_PRIVATE');
class PrivateOnly {
    async handle({ response }, next) {
        if (!isPrivate) {
            return response.redirect('/dashboard');
        }
        await next();
    }
}
exports.default = PrivateOnly;
//# sourceMappingURL=PrivateOnly.js.map
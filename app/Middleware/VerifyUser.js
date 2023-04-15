"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerifyUser {
    async handle({ auth, response }, next) {
        if (!auth.user?.verified) {
            await auth.use('web').logout();
            return response.redirect('/login');
        }
        await next();
    }
}
exports.default = VerifyUser;
//# sourceMappingURL=VerifyUser.js.map
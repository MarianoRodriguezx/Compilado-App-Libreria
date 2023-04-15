"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignedRoute {
    async handle({ request, response }, next) {
        if (!request.hasValidSignature()) {
            return response.redirect('/not-found');
        }
        await next();
    }
}
exports.default = SignedRoute;
//# sourceMappingURL=SignedRoute.js.map
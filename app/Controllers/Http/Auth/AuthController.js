"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/LoginValidator"));
const RegisterValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/RegisterValidator"));
class AuthController {
    async register({ request, response, auth }) {
        await request.validate(RegisterValidator_1.default);
        const userData = request.only(User_1.default.register);
        await User_1.default.create(userData);
        const token = await auth.use('api').attempt(userData.email, userData.password, {});
        return response.created({
            status: true,
            message: 'Usuario egistrado exitosamente',
            data: {
                "token": token,
                "user": auth.user
            }
        });
    }
    async login({ request, response }) {
        await request.validate(LoginValidator_1.default);
        const userData = request.only(User_1.default.login);
        try {
            const user = await User_1.default.findByOrFail('email', userData.email);
            if (!user.status) {
                response.status(405);
                return {
                    status: true,
                    message: 'Tu cuenta no está activa. Contacta a soporte',
                    data: {},
                    isExternalApi: false
                };
            }
            return response.redirect('/welcome');
        }
        catch (error) {
            console.log(error);
            return response.redirect('/login');
        }
    }
    async logout({ auth, response }) {
        await auth.use('api').revoke();
        return response.ok({
            status: true,
            message: 'Sesión cerrada correctamente',
            data: {},
            isExternalApi: false
        });
    }
    async profile({ auth, response }) {
        return response.ok({
            status: true,
            message: 'Perfil encontrado correctamente',
            data: auth.user,
            isExternalApi: false
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map
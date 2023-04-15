"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/LoginValidator"));
const RegisterValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/RegisterValidator"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
class AuthController {
    async register({ request, response, auth }) {
        await request.validate(RegisterValidator_1.default);
        const userData = request.only(User_1.default.register);
        await User_1.default.create(userData);
        return response.created({
            status: true,
            message: 'Usuario egistrado exitosamente',
            data: {
                "user": auth.user
            }
        });
    }
    async login({ request, response, auth, session }) {
        await request.validate(LoginValidator_1.default);
        const userData = request.only(User_1.default.login);
        const isPrivate = Env_1.default.get('IS_PRIVATE');
        try {
            const user = await User_1.default.findByOrFail('email', userData.email);
            if (!user.status) {
                session.flash('form', 'Tu cuenta se encuenta desactivada, contactate con el administrador');
                return response.redirect().back();
            }
            if (isPrivate) {
                if (!User_1.default.privateAccess.includes(user.role)) {
                    session.flash('form', 'Este usuario no tiene acceso permitido');
                    return response.redirect().back();
                }
            }
            else {
                if (!User_1.default.publicAccess.includes(user.role)) {
                    session.flash('form', 'Este usuario no tiene acceso permitido');
                    return response.redirect().back();
                }
            }
            await auth.use('web').attempt(userData.email, userData.password);
            if (+user.role === User_1.default.NORMAL.id) {
                user.verified = true;
                await user.save();
                return response.redirect('/dashboard');
            }
            else {
                const signedRoute = Route_1.default.builder()
                    .params({ userId: auth.user.id })
                    .makeSigned('/sendMail', { expiresIn: '1m' });
                return response.redirect(signedRoute);
            }
        }
        catch (error) {
            console.log(error);
            session.flash('form', 'Tu Email o Contraseña son Incorrectos');
            return response.redirect().back();
        }
    }
    async logout({ auth, response }) {
        const user = await User_1.default.findByOrFail('email', auth.user.email);
        user.verified = false;
        await user.save();
        await auth.use('web').logout();
        return response.redirect('/login');
    }
    async profile({ auth, view }) {
        const data = {
            user: auth.user
        };
        return view.render('pages/auth/profile', data);
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map
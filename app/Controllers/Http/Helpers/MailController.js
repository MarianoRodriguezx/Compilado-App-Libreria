"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const VerificationCode_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/VerificationCode"));
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
class MailController {
    async sendMail({ view, auth }) {
        const min = 111111;
        const max = 999999;
        const generatedCode = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("Código de verificación:", generatedCode);
        await Mail_1.default.send((message) => {
            message
                .to(auth.user.email)
                .subject('Código de verificación')
                .htmlView('emails/verificationCode', { code: generatedCode });
        });
        await this.resetCodes(auth.user.id);
        await VerificationCode_1.default.create({
            user_id: auth.user.id,
            code: await Hash_1.default.make(generatedCode.toString())
        });
        const data = {
            msg: "",
            hasError: false
        };
        return view.render('pages/submit_code', data);
    }
    async submitCode({ view, response, auth, request }) {
        const verificationCode = await VerificationCode_1.default.findByOrFail('user_id', auth.user.id);
        let submitedCode = request.input('code');
        if (!submitedCode)
            submitedCode = "nocode";
        const verifiedCode = await Hash_1.default.verify(verificationCode.code, submitedCode);
        if (verifiedCode && +auth.user.role === User_1.default.ADMIN.id) {
            await this.resetCodes(auth.user.id);
            const signedRoute = Route_1.default.builder()
                .params({ userId: auth.user.id })
                .makeSigned('/generate/qr', { expiresIn: '1m' });
            return response.redirect(signedRoute);
        }
        if (verifiedCode) {
            await this.resetCodes(auth.user.id);
            const user = await User_1.default.findByOrFail('email', auth.user.email);
            user.verified = true;
            await user.save();
            return response.redirect('/dashboard');
        }
        verificationCode.strikes += 1;
        await verificationCode.save();
        if (+verificationCode.strikes === 3) {
            await this.resetCodes(auth.user.id);
            return response.redirect('login');
        }
        const data = {
            msg: `Código inválido. Intentos restantes: ${3 - verificationCode.strikes}`,
            hasError: true
        };
        return view.render('pages/submit_code', data);
    }
    async resetCodes(userId) {
        await VerificationCode_1.default.query()
            .where('user_id', userId)
            .delete();
    }
}
exports.default = MailController;
//# sourceMappingURL=MailController.js.map
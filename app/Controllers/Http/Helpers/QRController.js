"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
var QRCode = require('qrcode');
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Ws"));
class MailController {
    async generateQR({ view, auth }) {
        const content = auth.user?.email;
        const qrCode = await QRCode.toDataURL(content, { scale: 10 });
        const data = {
            qrCode: qrCode,
            email: auth.user?.email
        };
        return view.render('pages/scan_qr', data);
    }
    async submitQR({ response, auth }) {
        const user = await User_1.default.findByOrFail('email', auth.user.email);
        user.verified = true;
        await user.save();
        return response.redirect('/dashboard');
    }
    async forceQr({ request }) {
        const email = request.input('email');
        console.log(email);
        Ws_1.default.io.emit(`verificate-${email}`, { my: 'data' });
    }
}
exports.default = MailController;
//# sourceMappingURL=QRController.js.map
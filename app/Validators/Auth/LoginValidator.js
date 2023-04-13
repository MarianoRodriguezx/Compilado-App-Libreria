"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class LoginValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.email()
            ]),
            password: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(180)
            ])
        });
        this.messages = {
            'email.required': 'El campo correo es obligatorio',
            'email.maxLength': 'El máximo de caracteres para el campo correo son 255',
            'email.unique': 'El correo ingresado no está disponible',
            'email.email': 'El correo ingresado no tiene formato válido',
            'password.required': 'El campo contraseña es obligatorio',
            'password.maxLength': 'El máximo de caracteres para el campo contraseña son 180',
        };
    }
}
exports.default = LoginValidator;
//# sourceMappingURL=LoginValidator.js.map
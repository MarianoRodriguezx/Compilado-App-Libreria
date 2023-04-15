"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class TokenValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            edit_token: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ])
        });
        this.messages = {
            'edit_token.required': 'El campo edit_token es obligatorio',
            'edit_token.maxLength': 'El máximo de caracteres para el campo edit_token son 255'
        };
    }
}
exports.default = TokenValidator;
//# sourceMappingURL=TokenValidator.js.map
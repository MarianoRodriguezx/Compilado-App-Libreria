"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.refs = Validator_1.schema.refs({
            id: this.ctx.params.id
        });
        this.schema = Validator_1.schema.create({
            params: Validator_1.schema.object().members({
                id: Validator_1.schema.number([
                    Validator_1.rules.required(),
                    Validator_1.rules.exists({ table: 'users', column: 'id' })
                ])
            }),
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.unique({ table: 'users', column: 'email',
                    whereNot: {
                        id: this.refs.id,
                    } }),
                Validator_1.rules.email()
            ]),
            username: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ]),
            role: Validator_1.schema.number([
                Validator_1.rules.required()
            ]),
            edit_token: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ])
        });
        this.messages = {
            'params.id.required': 'El campo id es obligatorio',
            'params.id.exists': 'El id debe existir en la tabla de usuarios',
            'email.required': 'El campo correo es obligatorio',
            'email.maxLength': 'El máximo de caracteres para el campo correo son 255',
            'email.unique': 'El correo ingresado no está disponible',
            'email.email': 'El correo ingresado no tiene formato válido',
            'username.required': 'El campo nombre es obligatorio',
            'username.maxLength': 'El máximo de caracteres para el campo nombre son 255',
            'role.required': 'El campo rol es obligatorio',
            'edit_token.required': 'El campo token es obligatorio',
            'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
        };
    }
}
exports.default = UpdateUserValidator;
//# sourceMappingURL=UpdateUserValidator.js.map
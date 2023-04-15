"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateAuthorValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            params: Validator_1.schema.object().members({
                id: Validator_1.schema.number([
                    Validator_1.rules.required(),
                    Validator_1.rules.exists({ table: 'authors', column: 'id' })
                ])
            }),
            name: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ]),
            nationality: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ]),
            edit_token: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ])
        });
        this.messages = {
            'params.id.required': 'El campo id es obligatorio',
            'params.id.exists': 'El id debe existir en la tabla de autores',
            'name.required': 'El campo nombre es obligatorio',
            'name.maxLength': 'El máximo de caracteres para el campo nombre son 255',
            'edit_token.required': 'El campo token es obligatorio',
            'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255',
            'nationality.required': 'El campo nacionalidad es obligatorio',
            'nationality.maxLength': 'El máximo de caracteres para el campo nacionalidad son 255'
        };
    }
}
exports.default = UpdateAuthorValidator;
//# sourceMappingURL=UpdateAuthorValidator.js.map
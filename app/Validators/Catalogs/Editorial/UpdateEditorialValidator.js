"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateEditorialValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            params: Validator_1.schema.object().members({
                id: Validator_1.schema.number([
                    Validator_1.rules.required(),
                    Validator_1.rules.exists({ table: 'editorials', column: 'id' })
                ])
            }),
            name: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ]),
            location: Validator_1.schema.string({ trim: true }, [
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
            'params.id.exists': 'El id debe existir en la tabla de editoriales',
            'name.required': 'El campo nombre es obligatorio',
            'name.maxLength': 'El máximo de caracteres para el campo nombre son 255',
            'location.required': 'El campo ubicación es obligatorio',
            'location.maxLength': 'El máximo de caracteres para el campo ubicación son 255',
            'edit_token.required': 'El campo token es obligatorio',
            'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
        };
    }
}
exports.default = UpdateEditorialValidator;
//# sourceMappingURL=UpdateEditorialValidator.js.map
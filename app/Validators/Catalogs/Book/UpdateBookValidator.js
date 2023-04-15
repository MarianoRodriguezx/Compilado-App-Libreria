"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateBookValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            params: Validator_1.schema.object().members({
                id: Validator_1.schema.number([
                    Validator_1.rules.required(),
                    Validator_1.rules.exists({ table: 'books', column: 'id' })
                ])
            }),
            name: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ]),
            description: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ]),
            author_id: Validator_1.schema.number([
                Validator_1.rules.required(),
                Validator_1.rules.exists({ table: 'authors', column: 'id' })
            ]),
            category_id: Validator_1.schema.number([
                Validator_1.rules.required(),
                Validator_1.rules.exists({ table: 'categories', column: 'id' })
            ]),
            editorial_id: Validator_1.schema.number([
                Validator_1.rules.required(),
                Validator_1.rules.exists({ table: 'editorials', column: 'id' })
            ]),
            edit_token: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ])
        });
        this.messages = {
            'params.id.required': 'El campo id es obligatorio',
            'params.id.exists': 'El id debe existir en la tabla de libros',
            'name.required': 'El campo nombre es obligatorio',
            'name.maxLength': 'El máximo de caracteres para el campo nombre son 255',
            'description.required': 'El campo descripción es obligatorio',
            'description.maxLength': 'El máximo de caracteres para el campo descripción son 255',
            'author_id.required': 'El campo autor es obligatorio',
            'author_id.number': 'El autor debe ser de tipo número',
            'author_id.exists': 'El autor ingresado no existe',
            'category_id.required': 'El campo categoría es obligatorio',
            'category_id.number': 'El categoría debe ser de tipo número',
            'category_id.exists': 'El categoría ingresado no existe',
            'editorial_id.required': 'El campo editorial es obligatorio',
            'editorial_id.number': 'El editorial debe ser de tipo número',
            'editorial_id.exists': 'El editorial ingresado no existe',
            'edit_token.required': 'El campo token es obligatorio',
            'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
        };
    }
}
exports.default = UpdateBookValidator;
//# sourceMappingURL=UpdateBookValidator.js.map
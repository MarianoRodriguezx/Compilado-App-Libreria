"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateBookCover {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            params: Validator_1.schema.object().members({
                id: Validator_1.schema.number([
                    Validator_1.rules.required(),
                    Validator_1.rules.exists({ table: 'books', column: 'id' })
                ])
            }),
            image_file: Validator_1.schema.file({
                size: '50mb',
                extnames: ['pdf'],
            }, [
                Validator_1.rules.required()
            ]),
            edit_token: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ])
        });
        this.messages = {
            'params.id.required': 'El campo id es obligatorio',
            'params.id.exists': 'El id debe existir en la tabla de libros',
            'edit_token.required': 'El campo token es obligatorio',
            'edit_token.maxLength': 'El máximo de caracteres para el campo token son 255'
        };
    }
}
exports.default = UpdateBookCover;
//# sourceMappingURL=UpdateBookCover.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StoreEditorialValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ]),
            location: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.required(),
                Validator_1.rules.maxLength(255)
            ])
        });
        this.messages = {
            'name.required': 'El campo nombre es obligatorio',
            'name.maxLength': 'El máximo de caracteres para el campo nombre son 255',
            'location.required': 'El campo ubicación es obligatorio',
            'location.maxLength': 'El máximo de caracteres para el campo ubicación son 255'
        };
    }
}
exports.default = StoreEditorialValidator;
//# sourceMappingURL=StoreEditorialValidator.js.map
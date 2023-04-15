"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Editorial_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Editorial"));
const EditorialData_1 = require("./EditorialData");
class default_1 extends Seeder_1.default {
    async run() {
        for (const editorial of EditorialData_1.editorials) {
            await Editorial_1.default.create(editorial);
        }
    }
    static async runSeed() {
        for (const editorial of EditorialData_1.editorials) {
            await Editorial_1.default.create(editorial);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=EditorialSeeder.js.map
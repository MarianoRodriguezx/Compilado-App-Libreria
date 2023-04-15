"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const CategoryData_1 = require("./CategoryData");
const Category_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Category"));
class default_1 extends Seeder_1.default {
    async run() {
        for (const category of CategoryData_1.categories) {
            await Category_1.default.create(category);
        }
    }
    static async runSeed() {
        for (const category of CategoryData_1.categories) {
            await Category_1.default.create(category);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=CategorySeeder.js.map
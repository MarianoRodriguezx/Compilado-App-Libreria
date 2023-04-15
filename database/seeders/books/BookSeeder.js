"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const BookData_1 = require("./BookData");
const Book_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Book"));
class default_1 extends Seeder_1.default {
    async run() {
        for (const book of BookData_1.books) {
            await Book_1.default.create(book);
        }
    }
    static async runSeed() {
        for (const book of BookData_1.books) {
            await Book_1.default.create(book);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=BookSeeder.js.map
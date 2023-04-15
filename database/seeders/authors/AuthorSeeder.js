"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const AuthorData_1 = require("./AuthorData");
const Author_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Catalogs/Author"));
class default_1 extends Seeder_1.default {
    async run() {
        for (const author of AuthorData_1.authors) {
            await Author_1.default.create(author);
        }
    }
    static async runSeed() {
        for (const author of AuthorData_1.authors) {
            await Author_1.default.create(author);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=AuthorSeeder.js.map
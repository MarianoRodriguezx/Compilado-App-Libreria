"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const UserSeeder_1 = __importDefault(require("./users/UserSeeder"));
const AuthorSeeder_1 = __importDefault(require("./authors/AuthorSeeder"));
const CategorySeeder_1 = __importDefault(require("./categories/CategorySeeder"));
const EditorialSeeder_1 = __importDefault(require("./editorials/EditorialSeeder"));
const BookSeeder_1 = __importDefault(require("./books/BookSeeder"));
class default_1 extends Seeder_1.default {
    async run() {
        await UserSeeder_1.default.runSeed();
        await AuthorSeeder_1.default.runSeed();
        await CategorySeeder_1.default.runSeed();
        await EditorialSeeder_1.default.runSeed();
        await BookSeeder_1.default.runSeed();
    }
}
exports.default = default_1;
//# sourceMappingURL=MainSeeder.js.map
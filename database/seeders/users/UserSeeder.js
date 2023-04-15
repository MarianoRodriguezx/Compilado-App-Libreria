"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const UserData_1 = require("./UserData");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class default_1 extends Seeder_1.default {
    async run() {
        for (const user of UserData_1.users) {
            await User_1.default.create(user);
        }
    }
    static async runSeed() {
        for (const user of UserData_1.users) {
            await User_1.default.create(user);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=UserSeeder.js.map
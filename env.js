"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
exports.default = Env_1.default.rules({
    HOST: Env_1.default.schema.string({ format: 'host' }),
    PORT: Env_1.default.schema.number(),
    APP_KEY: Env_1.default.schema.string(),
    APP_NAME: Env_1.default.schema.string(),
    CACHE_VIEWS: Env_1.default.schema.boolean(),
    SESSION_DRIVER: Env_1.default.schema.string(),
    DRIVE_DISK: Env_1.default.schema.enum(['local', 's3']),
    NODE_ENV: Env_1.default.schema.enum(['development', 'production', 'test']),
    PG_USER: Env_1.default.schema.string(),
    PG_PASSWORD: Env_1.default.schema.string.optional(),
    PG_DB_NAME: Env_1.default.schema.string(),
    PG_HOST: Env_1.default.schema.string(),
    PG_PORT: Env_1.default.schema.number(),
    IS_PRIVATE: Env_1.default.schema.boolean(),
});
//# sourceMappingURL=env.js.map
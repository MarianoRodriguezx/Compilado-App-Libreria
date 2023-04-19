"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const User_1 = __importDefault(require("../User"));
const Author_1 = __importDefault(require("./Author"));
const Category_1 = __importDefault(require("./Category"));
const Editorial_1 = __importDefault(require("./Editorial"));
class Book extends Orm_1.BaseModel {
    static get store() {
        return [
            'name',
            'description',
            'author_id',
            'category_id',
            'editorial_id'
        ];
    }
    static get update() {
        return this.store;
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Book.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Book.prototype, "book_path", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Book.prototype, "cover_path", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Book.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Book.prototype, "posted_by", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Book.prototype, "author_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Book.prototype, "category_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Book.prototype, "editorial_id", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Book.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Book.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => User_1.default, {
        foreignKey: "id",
        localKey: "posted_by",
    }),
    __metadata("design:type", Object)
], Book.prototype, "postedBy", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Author_1.default, {
        foreignKey: "id",
        localKey: "author_id",
    }),
    __metadata("design:type", Object)
], Book.prototype, "author", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Category_1.default, {
        foreignKey: "id",
        localKey: "category_id",
    }),
    __metadata("design:type", Object)
], Book.prototype, "category", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Editorial_1.default, {
        foreignKey: "id",
        localKey: "editorial_id",
    }),
    __metadata("design:type", Object)
], Book.prototype, "editorial", void 0);
exports.default = Book;
//# sourceMappingURL=Book.js.map
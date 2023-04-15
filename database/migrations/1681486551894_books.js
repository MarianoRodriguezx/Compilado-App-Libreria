"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'books';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.text('description').notNullable();
            table.string('book_path', 255).notNullable();
            table.string('cover_path', 255).notNullable();
            table.boolean('status').notNullable().defaultTo(true);
            table.integer('posted_by').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('CASCADE');
            table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
            table.integer('editorial_id').unsigned().references('id').inTable('editorials').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1681486551894_books.js.map
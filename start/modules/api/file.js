"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('upload/image', 'FilesController.uploadImage').as('uploadImage');
    Route_1.default.post('get/image', 'FilesController.getImage').as('getImage');
    Route_1.default.post('upload/pdf', 'FilesController.uploadPDF').as('uploadPDF');
    Route_1.default.post('get/pdf', 'FilesController.getPDF').as('getPDF');
})
    .namespace('App/Controllers/Http/Helpers');
//# sourceMappingURL=file.js.map
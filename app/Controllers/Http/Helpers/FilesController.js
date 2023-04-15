"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const fs_1 = __importDefault(require("fs"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
class FilesController {
    async uploadImage({ request, response }) {
        try {
            const fileDataSchema = Validator_1.schema.create({
                my_file: Validator_1.schema.file({
                    size: '10mb',
                    extnames: ['jpg', 'jpeg', 'gif', 'png'],
                })
            });
            const fileData = await request.validate({ schema: fileDataSchema });
            const myFile = fileData.my_file;
            const path = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/images/' : 'oficial/images/';
            const filename = (0, Helpers_1.cuid)();
            const filePath = `${path}${filename}.${myFile.extname}`;
            await myFile.move(Application_1.default.tmpPath('uploads'), {
                name: filename,
                overwrite: true
            });
            await Drive_1.default.putStream(filePath, fs_1.default.createReadStream(Application_1.default.tmpPath(`uploads/${filename}`)), {});
            return response.status(200).send({ success: true });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, error: 'Error al cargar el archivo' });
        }
    }
    async getImage({ request, response }) {
        try {
            const path = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/images/' : 'oficial/images/';
            const filename = request.input("filename");
            const filePath = `${path}${filename}`;
            const url = await Drive_1.default.getUrl(filePath);
            console.log(url);
            return url;
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, error: 'Error al descargar el archivo' });
        }
    }
    async uploadPDF({ request, response }) {
        try {
            const fileDataSchema = Validator_1.schema.create({
                my_file: Validator_1.schema.file({
                    size: '50mb',
                    extnames: ['pdf'],
                })
            });
            const fileData = await request.validate({ schema: fileDataSchema });
            const myFile = fileData.my_file;
            const path = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/pdf/' : 'oficial/pdf/';
            const filename = (0, Helpers_1.cuid)();
            const filePath = `${path}${filename}.${myFile.extname}`;
            await myFile.move(Application_1.default.tmpPath('uploads'), {
                name: filename,
                overwrite: true
            });
            await Drive_1.default.putStream(filePath, fs_1.default.createReadStream(Application_1.default.tmpPath(`uploads/${filename}`)), {});
            console.log(filePath);
            return response.status(200).send({ success: true });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, error: 'Error al cargar el archivo' });
        }
    }
    async getPDF({ request, response }) {
        try {
            const path = Env_1.default.get('NODE_ENV') === 'development' ? 'testing/pdf/' : 'oficial/pdf/';
            const filename = request.input("filename");
            const filePath = `${path}${filename}`;
            const url = await Drive_1.default.getSignedUrl(filePath, {
                expiresIn: '30mins'
            });
            console.log(url);
            return response.redirect(url);
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, error: 'Error al descargar el archivo' });
        }
    }
}
exports.default = FilesController;
//# sourceMappingURL=FilesController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Ws"));
Ws_1.default.boot();
Ws_1.default.io.on('connection', (socket) => {
    socket.on('ingresar', (data) => {
        console.log("Señal detectada en socket.ts");
        console.log(data);
        Ws_1.default.io.emit(`verificate-${data}`, { access: true });
    });
});
//# sourceMappingURL=socket.js.map
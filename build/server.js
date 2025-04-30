"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const auth_routes_1 = __importDefault(require("./src/modules/auth/auth.routes"));
const bootstrap_routes_1 = __importDefault(require("./src/modules/bootstrap/bootstrap.routes"));
const product_routes_1 = __importDefault(require("./src/modules/product/product.routes"));
const db_1 = require("./src/config/db");
const { PORT } = process.env;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use('/user', auth_routes_1.default);
    app.use('/bootstrap', bootstrap_routes_1.default);
    app.use('/user/product', product_routes_1.default);
    yield (0, db_1.dbConnect)();
    const server = http_1.default.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}))();

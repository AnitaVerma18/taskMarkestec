"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airports = exports.City = exports.Carts = exports.Products = exports.Sessions = exports.Users = void 0;
const airport_model_1 = __importDefault(require("./airport.model"));
exports.Airports = airport_model_1.default;
const cart_model_1 = __importDefault(require("./cart.model"));
exports.Carts = cart_model_1.default;
const city_model_1 = __importDefault(require("./city.model"));
exports.City = city_model_1.default;
const product_model_1 = __importDefault(require("./product.model"));
exports.Products = product_model_1.default;
const session_model_1 = __importDefault(require("./session.model"));
exports.Sessions = session_model_1.default;
const user_model_1 = __importDefault(require("./user.model"));
exports.Users = user_model_1.default;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    image: { type: String, default: null },
    createdAt: { type: Number, default: () => (0, moment_1.default)().utc().valueOf() },
    updatedAt: { type: Number, default: 0 },
}, {
    timestamps: false // Disable timestamp because we are handling createdAt and updatedAt manually, if we are setting this to true then it will create automatically createdAt and updatedAt with Date type.
});
const Products = mongoose_1.default.model("Products", productSchema);
exports.default = Products;

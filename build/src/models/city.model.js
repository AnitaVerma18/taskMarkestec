"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const citySchema = new mongoose_1.default.Schema({
    city: { type: String, default: null, required: true },
    country: { type: String, default: null, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    },
    createdAt: { type: Number, default: () => (0, moment_1.default)().utc().valueOf() },
    updatedAt: { type: Number, default: 0 },
}, {
    timestamps: false // Disable timestamp because we are handling createdAt and updatedAt manually, if we are setting this to true then it will create automatically createdAt and updatedAt with Date type.
});
citySchema.index({ location: '2dsphere' });
const City = mongoose_1.default.model("City", citySchema);
exports.default = City;

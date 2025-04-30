"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProducts = void 0;
const Models = __importStar(require("../../models/index"));
const Handler = __importStar(require("../../handler/handler"));
const addProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Models.Products.deleteMany({});
        const dummyProducts = [
            {
                name: 'Wireless Mouse',
                description: 'A smooth, ergonomic wireless mouse with long battery life.',
                price: 25.99,
                quantity: 100,
                image: 'dummyImage',
            },
            {
                name: 'Mechanical Keyboard',
                description: 'RGB backlit mechanical keyboard with blue switches.',
                price: 79.99,
                quantity: 50,
                image: 'dummyImage',
            },
            {
                name: 'HD Webcam',
                description: '1080p HD webcam with built-in microphone.',
                price: 45.5,
                quantity: 75,
                image: 'dummyImage',
            },
            {
                name: 'Laptop Stand',
                description: 'Adjustable aluminum laptop stand for better posture.',
                price: 30.0,
                quantity: 120,
                image: 'dummyImage',
            },
            {
                name: 'USB-C Hub',
                description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
                price: 39.99,
                quantity: 60,
                image: 'dummyImage',
            }
        ];
        yield Models.Products.insertMany(dummyProducts);
        const response = { message: "Products added successfully" };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.addProducts = addProducts;

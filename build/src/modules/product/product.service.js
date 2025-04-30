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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartList = exports.removeCart = exports.addCart = exports.products = void 0;
const Models = __importStar(require("../../models/index"));
const Handler = __importStar(require("../../handler/handler"));
const error_1 = require("../../handler/error");
const CommonHelper = __importStar(require("../../common/common"));
const moment_1 = __importDefault(require("moment"));
const projection = { __v: 0 };
const option = { lean: true };
const products = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pagination, limit } = req.query;
        const option = CommonHelper.setOptions(+pagination, +limit);
        const fetchProducts = yield Models.Products.find({}, projection, option);
        const response = {
            message: "Products",
            count: fetchProducts === null || fetchProducts === void 0 ? void 0 : fetchProducts.length,
            data: fetchProducts
        };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.products = products;
const addCart = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.userData;
        const { productId, quantity } = req.body;
        const query = { _id: productId, quantity: { $gte: quantity } };
        const fetchProduct = yield Models.Products.findOne(query, projection, option);
        if (fetchProduct) {
            // check product exists then update the quantity
            const query = { productId: productId, userId: userId };
            const fetchCart = yield Models.Carts.findOne(query, projection, option);
            if (fetchCart) {
                const totalQuantity = fetchCart.quantity + quantity;
                const updateCart = { quantity: totalQuantity, updatedAt: (0, moment_1.default)().utc().valueOf() };
                yield Models.Carts.updateOne(query, updateCart);
            }
            else {
                //add product into a cart
                const cartData = {
                    userId,
                    productId,
                    quantity
                };
                yield Models.Carts.create(cartData);
            }
            const response = { message: "Product added into cart successfully" };
            return response;
        }
        else {
            return Handler.handleCustomError(error_1.ProductQuantity);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.addCart = addCart;
const removeCart = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const cartdata = yield Models.Carts.deleteOne({ _id });
        const response = { message: "Product removed from cart" };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.removeCart = removeCart;
const cartList = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.userData;
        const query = { userId: userId };
        const fetchCarts = yield Models.Carts.find(query, projection, option).populate({
            path: "productId",
            select: "name description price quantity image"
        });
        let totalPrice = 0;
        if (fetchCarts === null || fetchCarts === void 0 ? void 0 : fetchCarts.length) {
            totalPrice = fetchCarts.reduce((sum, item) => {
                return sum + (item.productId.price * item.quantity);
            }, 0);
        }
        const response = {
            totalPrice: parseFloat(totalPrice.toFixed(2)),
            count: fetchCarts === null || fetchCarts === void 0 ? void 0 : fetchCarts.length,
            data: fetchCarts
        };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.cartList = cartList;

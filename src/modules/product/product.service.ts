import { Request } from 'express';
import * as Models from '../../models/index';
import * as Handler from '../../handler/handler';
import { ErrorResponse, ProductQuantity } from '../../handler/error';
import { CartResponse, MessageResponse, ProductResponse } from '../../types/response';
import { Model } from 'mongoose';
import * as CommonHelper from '../../common/common';
import { CustomRequest } from '../../interfaces/common.interface';
import moment from 'moment';



const projection = { __v: 0 };
const option = { lean: true };

const products = async (req: CustomRequest): Promise<ProductResponse> => {
    try {
        const { pagination, limit } = req.query;
        const option = CommonHelper.setOptions(+pagination!, +limit!);
        const fetchProducts = await Models.Products.find({}, projection, option);
        const response: ProductResponse = {
            message: "Products",
            count: fetchProducts?.length,
            data: fetchProducts
        }
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const addCart = async (req: CustomRequest): Promise<MessageResponse> => {
    try {
        const { _id: userId } = req.userData!;
        const { productId, quantity } = req.body;
        const query = { _id: productId, quantity: { $gte: quantity } }
        const fetchProduct = await Models.Products.findOne(query, projection, option);
        if (fetchProduct) {
            // check product exists then update the quantity
            const query = { productId: productId, userId: userId }
            const fetchCart = await Models.Carts.findOne(query, projection, option);
            if (fetchCart) {
                const totalQuantity = fetchCart.quantity + quantity;
                const updateCart = { quantity: totalQuantity, updatedAt:moment().utc().valueOf() }
                await Models.Carts.updateOne(query, updateCart);
            }
            else {
                //add product into a cart
                const cartData = {
                    userId,
                    productId,
                    quantity
                }
                await Models.Carts.create(cartData);
            }
            const response: MessageResponse = { message: "Product added into cart successfully" };
            return response;

        }
        else {
            return Handler.handleCustomError(ProductQuantity);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const removeCart = async (req: CustomRequest): Promise<MessageResponse> => {
    try {
        const { _id } = req.params;
        const cartdata = await Models.Carts.deleteOne({ _id });
        const response: MessageResponse = { message: "Product removed from cart" }
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const cartList = async (req: CustomRequest): Promise<CartResponse> => {
    try {
        const { _id: userId } = req.userData!;
        const query = { userId: userId }
        const fetchCarts = await Models.Carts.find(query, projection, option).populate({
            path: "productId",
            select: "name description price quantity image"
        });
        let totalPrice = 0;
        if (fetchCarts?.length) {
            totalPrice = fetchCarts.reduce((sum, item) => {
                return sum + (item.productId.price * item.quantity);
            }, 0);
        }
        const response: CartResponse = {
            totalPrice: parseFloat(totalPrice.toFixed(2)),
            count: fetchCarts?.length,
            data: fetchCarts
        }
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}


export {
    products,
    addCart,
    removeCart,
    cartList
}
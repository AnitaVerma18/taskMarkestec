import { Response } from 'express';
import * as Service from './product.service';
import * as Handler from '../../handler/handler';
import { ErrorResponse } from '../../handler/error';
import { CustomRequest } from '../../interfaces/common.interface';

const products = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.products(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const addCart = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.addCart(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const removeCart = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.removeCart(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const cartList = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.cartList(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}



export {
    products,
    addCart,
    removeCart,
    cartList
}

import { Request, Response } from 'express';
import * as Service from './bootstrap.service';
import * as Handler from '../../handler/handler';
import { ErrorResponse } from '../../handler/error';

const addProducts = async (req: Request, res: Response) => {
    try {
        const response = await Service.addProducts(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const addCity = async (req: Request, res: Response) => {
    try {
        const response = await Service.addCity(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const addAirports = async (req: Request, res: Response) => {
    try {
        const response = await Service.addAirports(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

export {
    addProducts,
    addCity,
    addAirports
}

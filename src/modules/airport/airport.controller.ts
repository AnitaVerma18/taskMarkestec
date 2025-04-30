import { Response } from 'express';
import * as Service from './airport.service';
import * as Handler from '../../handler/handler';
import { ErrorResponse } from '../../handler/error';
import { CustomRequest } from '../../interfaces/common.interface';

const airports = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.airports(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

export {
    airports
}

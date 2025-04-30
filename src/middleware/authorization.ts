import { NextFunction, Response } from 'express';
import * as Handler from '../handler/handler';
import { BearerToken, ErrorResponse, ProvideToken, Unauthorized } from '../handler/error';
import * as CommonHelper from '../common/common';
import { Types } from 'mongoose';
import { CustomRequest } from '../interfaces/common.interface';
import { config } from 'dotenv';
config();

const authorization = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return Handler.handleCustomError(ProvideToken);
        const [scheme, tokenValue] = (authorization as string).split(' ');
        if (scheme != 'Bearer') return Handler.handleCustomError(BearerToken);
            const verifyData = await CommonHelper.verifyToken(tokenValue);
            if (verifyData) {
                const query = { _id: new Types.ObjectId(verifyData._id) }
                const user = await CommonHelper.fetchUser(query);
                if (user) {
                    if (user.otp == null && user.isEmailVerified != true) {
                        return Handler.handleCustomError(Unauthorized);
                    }
                    delete user.otp;
                    user.accessToken = tokenValue;
                    req.userData = user;
                    next();
                }
                else {
                    return Handler.handleCustomError(Unauthorized);
                }
            }
            else {
                return Handler.handleCustomError(Unauthorized);
            }
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
};

export {
    authorization
};

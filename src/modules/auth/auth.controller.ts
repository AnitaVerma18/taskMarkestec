import { Request, Response } from 'express';
import * as Service from './auth.service';
import * as Handler from '../../handler/handler';
import { ErrorResponse } from '../../handler/error';
import { CustomRequest } from '../../interfaces/common.interface';

const signup = async (req: Request, res: Response) => {
    try {
        const response = await Service.signup(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const verifyEmail = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.verifyEmail(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const resendOtp = async (req: Request, res: Response) => {
    try {
        const response = await Service.resendOtp(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const forgotPassword = async (req: Request, res: Response) => {
    try {
        const response = await Service.forgotPassword(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const verifyOtp = async (req: Request, res: Response) => {
    try {
        const response = await Service.verifyOtp(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try {
        const response = await Service.resetPassword(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const response = await Service.login(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

const profile = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.profile(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}


const logout = async (req: CustomRequest, res: Response) => {
    try {
        const response = await Service.logout(req);
        return Handler.handleSuccess(res, response);
    }
    catch (err) {
        return Handler.handleCatchError(res, err as ErrorResponse);
    }
}

export {
    signup,
    verifyEmail,
    resendOtp,
    forgotPassword,
    verifyOtp,
    resetPassword,
    login,
    logout,
    profile
}

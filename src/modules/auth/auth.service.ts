import { Request } from 'express';
import * as Models from '../../models/index';
import moment from 'moment-timezone';
import { Types } from 'mongoose';
import * as Handler from '../../handler/handler';
import { EmailAlreadyExists, EmailNotRegistered, ErrorResponse, NotFound, SomethingWentWrong, WrongOtp, WrongPassword } from '../../handler/error';
import * as CommonHelper from '../../common/common';
import { Token, SignupPayload, CustomRequest } from '../../interfaces/common.interface';
import User from '../../interfaces/user.interface';
import Session from '../../interfaces/session.interface';
import { MessageResponse, UserResponse, VerifyResponse } from '../../types/response';

const projection = { __v: 0 };
const option = { lean: true };
const options = { new: true };


const signup = async (req: Request): Promise<UserResponse> => {
    try {
        const { email } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail };
        const user = await Models.Users.findOne(query, projection, option);
        if (user) {
            if (user.isEmailVerified) return Handler.handleCustomError(EmailAlreadyExists);
            await Models.Sessions.deleteMany({ userId: user._id });
            const updatedData = await updateUser(user._id, req.body);
            const response: UserResponse = {
                message: `Custom Otp - ${updatedData?.otp!}`, // custom otp rather than sending in email templates.
                data: updatedData!
            }
            return response;
        }
        else {
            const newUser = await createNewUser(req.body);
            const response: UserResponse = {
                message: `Custom Otp for now - 1234`,
                data: newUser
            }
            return response;
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const createNewUser = async (payload: SignupPayload): Promise<User> => {
    try {
        const data = await signupData(payload);
        const user = await Models.Users.create(data);
        user._doc.accessToken = await CommonHelper.signToken({_id: user._id});
        delete user._doc.password;
        return user;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
};

const updateUser = async (userId: Types.ObjectId, payload: SignupPayload): Promise<User | null> => {
    try {
        const data = await signupData(payload);
        const updatedUser = await Models.Users.findOneAndUpdate({ _id: userId }, data, options);
        updatedUser!._doc.accessToken = await CommonHelper.signToken({_id: updatedUser!._id});
        delete updatedUser!._doc.password;
        return updatedUser;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const signupData = async (payload: SignupPayload): Promise<User> => {
    try {
        const bcryptPass: string = await CommonHelper.hashPassword(payload?.password);
        const otp: string = "1234";
        const data: User = {
            email: payload?.email.toLowerCase(),
            password: bcryptPass,
            otp: otp,
            firstname: payload?.firstname,
            lastname: payload?.lastname,
            createdAt: moment().utc().valueOf()
        }
        return data;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const verifyEmail = async (req: CustomRequest): Promise<MessageResponse> => {
    try {
        const { otp: inputOtp } = req.body;
        const { _id } = req.userData!;
        const query = { _id: _id };
        const fetchData: User | null = await Models.Users.findOne(query, projection, option);
        if (fetchData) {
            if (inputOtp === fetchData.otp) {
                const update = { isEmailVerified: true, otp: null }
                await Models.Users.findOneAndUpdate(query, update, options);
                const response: MessageResponse = { message: "Otp verified successfully" }
                return response;
            }
            else {
                return Handler.handleCustomError(WrongOtp);
            }
        }
        else {
            return Handler.handleCustomError(NotFound);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const resendOtp = async (req: Request): Promise<MessageResponse> => {
    try {
        const { email } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail };
        const fetchData = await CommonHelper.fetchUser(query);
        if (fetchData) {
            const otp = "1234"; // we are using custom otp
            const update = { otp: otp };
            await Models.Users.findOneAndUpdate(query, update, options);
            const response: MessageResponse = { message: `Custom OTP - 1234` };
            return response;
        }
        else {
            return Handler.handleCustomError(EmailNotRegistered);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const forgotPassword = async (req: Request): Promise<MessageResponse> => {
    try {
        const { email } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail, isEmailVerified: true };
        const fetchData = await CommonHelper.fetchUser(query);
        if (fetchData) {
            const { _id } = fetchData;
            const otp = "1234";
            const query = { _id: _id };
            const update = { otp: otp };
            await Models.Users.findOneAndUpdate(query, update, options);
            const response: MessageResponse = { message: `Custom OTP - 1234` };
            return response;
        }
        else {
            return Handler.handleCustomError(EmailNotRegistered);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const verifyOtp = async (req: Request): Promise<VerifyResponse> => {
    try {
        const { otp: inputOtp, email } = req.body;
        const lowerCaseEmail = email.toLowerCase()
        const query = { email: lowerCaseEmail };
        const projection = { otp: 1 };
        const fetchData: User | null = await Models.Users.findOne(query, projection, option);
        if (fetchData) {
            if (inputOtp === fetchData.otp) {
                const uniqueCode = CommonHelper.generateUniqueCode();
                const update = { uniqueCode: uniqueCode, otp: null }
                await Models.Users.findOneAndUpdate(query, update, options)
                const response: VerifyResponse = {
                    message: "Otp verified successfully",
                    uniqueCode: uniqueCode
                }
                return response;
            }
            else {
                return Handler.handleCustomError(WrongOtp);
            }
        }
        else {
            return Handler.handleCustomError(NotFound);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const resetPassword = async (req: Request): Promise<MessageResponse> => {
    try {
        const { uniqueCode, password } = req.body;
        const query = { uniqueCode: uniqueCode };
        const fetchData = await CommonHelper.fetchUser(query);
        if (fetchData) {
            const hashPass = await CommonHelper.hashPassword(password);
            const update = { uniqueCode: null, password: hashPass };
            await Models.Users.findOneAndUpdate(query, update, options);
            const response: MessageResponse = { message: "Password Changed Successfully" };
            return response;
        }
        else {
            return Handler.handleCustomError(NotFound);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const login = async (req: Request): Promise<UserResponse> => {
    try {
        const { email, password } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail, isEmailVerified: true };
        const fetchData = await Models.Users.findOne(query, projection, option);
        if (fetchData) {
            const { _id, password: oldPassword } = fetchData;
            if (oldPassword == null) return Handler.handleCustomError(SomethingWentWrong);
            const decryptPass = await CommonHelper.comparePassword(oldPassword, password);
            if (!decryptPass) return Handler.handleCustomError(WrongPassword);
            const data: Token = { _id: _id };
            const accessToken = await CommonHelper.signToken(data);
            const resData: User = {
                _id: fetchData?._id,
                email: fetchData?.email,
                accessToken: accessToken
            };
            const response: UserResponse = {
                message: "Login successfully",
                data: resData
            };
            return response;
        }
        else {
            return Handler.handleCustomError(EmailNotRegistered);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const profile = async (req: CustomRequest): Promise<User> => {
    try {
        delete req.userData!.accessToken;
        return req.userData! ?? {};
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const logout = async (req: CustomRequest): Promise<MessageResponse> => {
    try {
        await Models.Sessions.deleteOne({ accessToken: req.userData!.accessToken });
        const response: MessageResponse = { message: "Logout Successfully" }
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
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
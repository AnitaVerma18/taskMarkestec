import { Types } from "mongoose";
import IUser from "./user.interface";
import { Request } from 'express';

export interface CustomRequest extends Request {
    userData?: IUser;
}

export interface Token {
    _id?: string | Types.ObjectId;
    iat?: number;
}

export interface SignupPayload {
    email: string;
    password: string;
    firstname: string;
    lastname?: string;
}
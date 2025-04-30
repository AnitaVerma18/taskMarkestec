import { Types } from "mongoose";

export default interface User {
    _id?: Types.ObjectId;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    otp?: string;
    uniqueCode?: string;
    isEmailVerified?: boolean;
    createdAt?: number;
    updatedAt?: number;
    accessToken?: string;
    _doc?: any;
}

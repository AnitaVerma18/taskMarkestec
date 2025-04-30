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
exports.profile = exports.logout = exports.login = exports.resetPassword = exports.verifyOtp = exports.forgotPassword = exports.resendOtp = exports.verifyEmail = exports.signup = void 0;
const Models = __importStar(require("../../models/index"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const Handler = __importStar(require("../../handler/handler"));
const error_1 = require("../../handler/error");
const CommonHelper = __importStar(require("../../common/common"));
const projection = { __v: 0 };
const option = { lean: true };
const options = { new: true };
const signup = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail };
        const user = yield Models.Users.findOne(query, projection, option);
        if (user) {
            if (user.isEmailVerified)
                return Handler.handleCustomError(error_1.EmailAlreadyExists);
            yield Models.Sessions.deleteMany({ userId: user._id });
            const updatedData = yield updateUser(user._id, req.body);
            const response = {
                message: `Custom Otp - ${updatedData === null || updatedData === void 0 ? void 0 : updatedData.otp}`, // custom otp rather than sending in email templates.
                data: updatedData
            };
            return response;
        }
        else {
            const newUser = yield createNewUser(req.body);
            const response = {
                message: `Custom Otp for now - 1234`,
                data: newUser
            };
            return response;
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.signup = signup;
const createNewUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield signupData(payload);
        const user = yield Models.Users.create(data);
        user._doc.accessToken = yield CommonHelper.signToken({ _id: user._id });
        delete user._doc.password;
        return user;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield signupData(payload);
        const updatedUser = yield Models.Users.findOneAndUpdate({ _id: userId }, data, options);
        updatedUser._doc.accessToken = yield CommonHelper.signToken({ _id: updatedUser._id });
        delete updatedUser._doc.password;
        return updatedUser;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
const signupData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bcryptPass = yield CommonHelper.hashPassword(payload === null || payload === void 0 ? void 0 : payload.password);
        const otp = "1234";
        const data = {
            email: payload === null || payload === void 0 ? void 0 : payload.email.toLowerCase(),
            password: bcryptPass,
            otp: otp,
            firstname: payload === null || payload === void 0 ? void 0 : payload.firstname,
            lastname: payload === null || payload === void 0 ? void 0 : payload.lastname,
            createdAt: (0, moment_timezone_1.default)().utc().valueOf()
        };
        return data;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
const verifyEmail = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp: inputOtp } = req.body;
        const { _id } = req.userData;
        const query = { _id: _id };
        const fetchData = yield Models.Users.findOne(query, projection, option);
        if (fetchData) {
            if (inputOtp === fetchData.otp) {
                const update = { isEmailVerified: true, otp: null };
                yield Models.Users.findOneAndUpdate(query, update, options);
                const response = { message: "Otp verified successfully" };
                return response;
            }
            else {
                return Handler.handleCustomError(error_1.WrongOtp);
            }
        }
        else {
            return Handler.handleCustomError(error_1.NotFound);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.verifyEmail = verifyEmail;
const resendOtp = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail };
        const fetchData = yield CommonHelper.fetchUser(query);
        if (fetchData) {
            const otp = "1234"; // we are using custom otp
            const update = { otp: otp };
            yield Models.Users.findOneAndUpdate(query, update, options);
            const response = { message: `Custom OTP - 1234` };
            return response;
        }
        else {
            return Handler.handleCustomError(error_1.EmailNotRegistered);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.resendOtp = resendOtp;
const forgotPassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail, isEmailVerified: true };
        const fetchData = yield CommonHelper.fetchUser(query);
        if (fetchData) {
            const { _id } = fetchData;
            const otp = "1234";
            const query = { _id: _id };
            const update = { otp: otp };
            yield Models.Users.findOneAndUpdate(query, update, options);
            const response = { message: `Custom OTP - 1234` };
            return response;
        }
        else {
            return Handler.handleCustomError(error_1.EmailNotRegistered);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.forgotPassword = forgotPassword;
const verifyOtp = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp: inputOtp, email } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail };
        const projection = { otp: 1 };
        const fetchData = yield Models.Users.findOne(query, projection, option);
        if (fetchData) {
            if (inputOtp === fetchData.otp) {
                const uniqueCode = CommonHelper.generateUniqueCode();
                const update = { uniqueCode: uniqueCode, otp: null };
                yield Models.Users.findOneAndUpdate(query, update, options);
                const response = {
                    message: "Otp verified successfully",
                    uniqueCode: uniqueCode
                };
                return response;
            }
            else {
                return Handler.handleCustomError(error_1.WrongOtp);
            }
        }
        else {
            return Handler.handleCustomError(error_1.NotFound);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.verifyOtp = verifyOtp;
const resetPassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueCode, password } = req.body;
        const query = { uniqueCode: uniqueCode };
        const fetchData = yield CommonHelper.fetchUser(query);
        if (fetchData) {
            const hashPass = yield CommonHelper.hashPassword(password);
            const update = { uniqueCode: null, password: hashPass };
            yield Models.Users.findOneAndUpdate(query, update, options);
            const response = { message: "Password Changed Successfully" };
            return response;
        }
        else {
            return Handler.handleCustomError(error_1.NotFound);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.resetPassword = resetPassword;
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const lowerCaseEmail = email.toLowerCase();
        const query = { email: lowerCaseEmail, isEmailVerified: true };
        const fetchData = yield Models.Users.findOne(query, projection, option);
        if (fetchData) {
            const { _id, password: oldPassword } = fetchData;
            if (oldPassword == null)
                return Handler.handleCustomError(error_1.SomethingWentWrong);
            const decryptPass = yield CommonHelper.comparePassword(oldPassword, password);
            if (!decryptPass)
                return Handler.handleCustomError(error_1.WrongPassword);
            const data = { _id: _id };
            const accessToken = yield CommonHelper.signToken(data);
            const resData = {
                _id: fetchData === null || fetchData === void 0 ? void 0 : fetchData._id,
                email: fetchData === null || fetchData === void 0 ? void 0 : fetchData.email,
                accessToken: accessToken
            };
            const response = {
                message: "Login successfully",
                data: resData
            };
            return response;
        }
        else {
            return Handler.handleCustomError(error_1.EmailNotRegistered);
        }
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.login = login;
const profile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        delete req.userData.accessToken;
        return (_a = req.userData) !== null && _a !== void 0 ? _a : {};
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.profile = profile;
const logout = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Models.Sessions.deleteOne({ accessToken: req.userData.accessToken });
        const response = { message: "Logout Successfully" };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.logout = logout;

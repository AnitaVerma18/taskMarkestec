"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityNotFound = exports.ProvideCityAndCountry = exports.ProductQuantity = exports.NotFound = exports.InvalidToken = exports.BearerToken = exports.ProvideToken = exports.WrongOtp = exports.EmailAlreadyExists = exports.EmailNotRegistered = exports.SomethingWentWrong = exports.WrongPassword = exports.Unauthorized = void 0;
exports.Unauthorized = {
    message: "You are not authorized to perform this action.",
    statusCode: 401
};
exports.WrongPassword = {
    message: "The password you entered is incorrect. Please try again.",
    statusCode: 400
};
exports.SomethingWentWrong = {
    message: "Something went wrong",
    statusCode: 400
};
exports.EmailNotRegistered = {
    message: "This email address is not registered with us. Please check and try again.",
    statusCode: 400
};
exports.EmailAlreadyExists = {
    message: "This email address is already registered. Please use a different email or log in with the existing one.",
    statusCode: 400
};
exports.WrongOtp = {
    message: "The OTP you entered is incorrect. Please try again.",
    statusCode: 400
};
exports.ProvideToken = {
    message: "Please provide token",
    statusCode: 401
};
exports.BearerToken = {
    message: "Not a bearer token",
    statusCode: 400
};
exports.InvalidToken = {
    message: "Invalid token",
    statusCode: 401
};
exports.NotFound = {
    message: "Not found",
    statusCode: 404
};
exports.ProductQuantity = {
    message: "Unable to add product to cart.",
    statusCode: 400
};
exports.ProvideCityAndCountry = {
    message: "Please provide city or country",
    statusCode: 400
};
exports.CityNotFound = {
    message: "City not found",
    statusCode: 400
};

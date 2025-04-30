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
exports.airports = void 0;
const Models = __importStar(require("../../models/index"));
const Handler = __importStar(require("../../handler/handler"));
const error_1 = require("../../handler/error");
const airport_aggregation_1 = __importDefault(require("./aggregation/airport.aggregation"));
const projection = { __v: 0 };
const option = { lean: true };
const airports = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city, country, search } = req.query;
        if (!city || !country) {
            return Handler.handleCustomError(error_1.ProvideCityAndCountry);
        }
        const query = { city: city, country: country };
        const fetchCity = yield Models.City.findOne(query, projection, option);
        if (!fetchCity) {
            return Handler.handleCustomError(error_1.CityNotFound);
        }
        const airports = yield getNearbyAirports(fetchCity.location.coordinates, 5, // limit the number of documents to find top five nearest airports
        search);
        const response = {
            count: airports.length,
            data: airports
        };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.airports = airports;
const getNearbyAirports = (coordinates_1, ...args_1) => __awaiter(void 0, [coordinates_1, ...args_1], void 0, function* (coordinates, limit = 5, search) {
    try {
        const query = [
            yield airport_aggregation_1.default.geonearStage(coordinates),
            yield airport_aggregation_1.default.searchStage(search),
            yield airport_aggregation_1.default.sortStage(),
            yield airport_aggregation_1.default.limitStage(limit),
            yield airport_aggregation_1.default.projectStage()
        ];
        const fetchData = yield Models.Airports.aggregate(query);
        return fetchData;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});

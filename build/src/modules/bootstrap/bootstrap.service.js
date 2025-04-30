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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAirports = exports.addCity = exports.addProducts = void 0;
const Models = __importStar(require("../../models/index"));
const Handler = __importStar(require("../../handler/handler"));
const projection = { __v: 0 };
const option = { lean: true };
const addProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Models.Products.deleteMany({});
        const dummyProducts = [
            {
                name: 'Wireless Mouse',
                description: 'A smooth, ergonomic wireless mouse with long battery life.',
                price: 25.99,
                quantity: 100,
                image: 'dummyImage',
            },
            {
                name: 'Mechanical Keyboard',
                description: 'RGB backlit mechanical keyboard with blue switches.',
                price: 79.99,
                quantity: 50,
                image: 'dummyImage',
            },
            {
                name: 'HD Webcam',
                description: '1080p HD webcam with built-in microphone.',
                price: 45.5,
                quantity: 75,
                image: 'dummyImage',
            },
            {
                name: 'Laptop Stand',
                description: 'Adjustable aluminum laptop stand for better posture.',
                price: 30.0,
                quantity: 120,
                image: 'dummyImage',
            },
            {
                name: 'USB-C Hub',
                description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
                price: 39.99,
                quantity: 60,
                image: 'dummyImage',
            }
        ];
        yield Models.Products.insertMany(dummyProducts);
        const response = { message: "Products added successfully" };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.addProducts = addProducts;
const addCity = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Models.City.deleteMany({});
        const dummyCity = [
            {
                "city": "Delhi",
                "country": "India",
                "location": { "type": "Point", "coordinates": [77.1025, 28.7041] }
            },
            {
                "city": "Mumbai",
                "country": "India",
                "location": { "type": "Point", "coordinates": [72.8777, 19.0760] }
            },
            {
                "city": "Bengaluru",
                "country": "India",
                "location": { "type": "Point", "coordinates": [77.5946, 12.9716] }
            },
            {
                "city": "Chennai",
                "country": "India",
                "location": { "type": "Point", "coordinates": [80.2707, 13.0827] }
            },
            {
                "city": "Hyderabad",
                "country": "India",
                "location": { "type": "Point", "coordinates": [78.4867, 17.3850] }
            }
        ];
        yield Models.City.insertMany(dummyCity);
        const response = { message: "Cities added successfully" };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.addCity = addCity;
const addAirports = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Models.Airports.deleteMany({});
        const dummyAirport = [
            {
                "name": "Indira Gandhi International Airport",
                "iata": "DEL",
                "type": "international",
                "city": "Delhi",
                "location": { "type": "Point", "coordinates": [77.1031, 28.5562] }
            },
            {
                "name": "Safdarjung Airport",
                "iata": "VI43",
                "type": "national",
                "city": "Delhi",
                "location": { "type": "Point", "coordinates": [77.2057, 28.5841] }
            },
            {
                "name": "Chhatrapati Shivaji Maharaj International Airport",
                "iata": "BOM",
                "type": "international",
                "city": "Mumbai",
                "location": { "type": "Point", "coordinates": [72.8656, 19.0896] }
            },
            {
                "name": "Juhu Airport",
                "iata": "VAJJ",
                "type": "national",
                "city": "Mumbai",
                "location": { "type": "Point", "coordinates": [72.8333, 19.0972] }
            },
            {
                "name": "Kempegowda International Airport",
                "iata": "BLR",
                "type": "international",
                "city": "Bengaluru",
                "location": { "type": "Point", "coordinates": [77.7101, 13.1986] }
            },
            {
                "name": "HAL Airport",
                "iata": "VOBG",
                "type": "national",
                "city": "Bengaluru",
                "location": { "type": "Point", "coordinates": [77.7056, 12.9576] }
            },
            {
                "name": "Chennai International Airport",
                "iata": "MAA",
                "type": "international",
                "city": "Chennai",
                "location": { "type": "Point", "coordinates": [80.1636, 12.9941] }
            },
            {
                "name": "Rajiv Gandhi International Airport",
                "iata": "HYD",
                "type": "international",
                "city": "Hyderabad",
                "location": { "type": "Point", "coordinates": [78.4300, 17.2403] }
            },
            {
                "name": "Begumpet Airport",
                "iata": "VOHY",
                "type": "national",
                "city": "Hyderabad",
                "location": { "type": "Point", "coordinates": [78.4659, 17.4531] }
            },
            {
                "name": "Tirupati Airport",
                "iata": "TIR",
                "type": "national",
                "city": "Chennai",
                "location": { "type": "Point", "coordinates": [79.5429, 13.6325] }
            }
        ];
        const arr = [];
        if (dummyAirport === null || dummyAirport === void 0 ? void 0 : dummyAirport.length) {
            for (let i = 0; i < dummyAirport.length; i++) {
                const fetchCity = yield Models.City.findOne({ city: dummyAirport[i].city }, projection, option);
                if (fetchCity) {
                    arr.push({
                        name: dummyAirport[i].name,
                        iata: dummyAirport[i].iata,
                        type: dummyAirport[i].type,
                        city: fetchCity._id,
                        location: dummyAirport[i].location
                    });
                }
            }
            yield Models.Airports.insertMany(arr);
        }
        const response = { message: "Airports added successfully" };
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err);
    }
});
exports.addAirports = addAirports;

import { Types } from "mongoose";
import City from "./city.interface";
import { AirportType } from "../enums/airportType.enum";

export default interface Airport {
    _id?: Types.ObjectId;
    name: string;
    iata: string;
    type: AirportType;
    city: City;
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      };
    createdAt?: number;
    updatedAt?: number;
}
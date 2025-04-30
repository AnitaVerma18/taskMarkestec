import { Types } from "mongoose";

export default interface City {
    _id?: Types.ObjectId;
    city: string;
    country: string;
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      };
    createdAt?: number;
    updatedAt?: number;
}
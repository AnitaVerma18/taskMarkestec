import { Types } from "mongoose";

export default interface Product {
    _id?: Types.ObjectId;
    name?: string;
    description?: string;
    price: number;
    quantity: number;
    image?: string;
    createdAt?: number;
    updatedAt?: number;
}


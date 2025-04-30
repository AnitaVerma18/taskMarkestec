import { Types } from "mongoose";
import Product from "./product.interface";
import User from "./user.interface";

export default interface Cart {
    _id?: Types.ObjectId;
    userId: User;
    productId: Product;
    quantity: number;
    createdAt?: number;
    updatedAt?: number;
}
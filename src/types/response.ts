
import Cart from "../interfaces/cart.interface";
import Product from "../interfaces/product.interface";
import User from "../interfaces/user.interface";

export type UserResponse = {
    message?: string;
    data: User
}

export type MessageResponse = {
    message: string
}

export type VerifyResponse = {
    message: string;
    uniqueCode: string
}

export type ProductResponse = {
    message?: string;
    count: number;
    data: Product[]
}

export type CartResponse = {
    totalPrice: number;
    count: number;
    data: Cart[]
}
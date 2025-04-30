import { Request } from 'express';
import * as Models from '../../models/index';
import * as Handler from '../../handler/handler';
import { ErrorResponse } from '../../handler/error';
import { MessageResponse } from '../../types/response';

const addProducts = async (req: Request): Promise<MessageResponse> => {
    try {
        await Models.Products.deleteMany({});
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
        await Models.Products.insertMany(dummyProducts);
        const response: MessageResponse = { message: "Products added successfully" }
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}


export {
    addProducts
}
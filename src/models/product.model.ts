import mongoose from 'mongoose';
import moment from 'moment';
import Product from '../interfaces/product.interface';

const productSchema = new mongoose.Schema<Product>({
    name: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    image: { type: String, default: null },
    createdAt: { type: Number, default: () => moment().utc().valueOf() },
    updatedAt: { type: Number, default: 0 },
}, {
    timestamps: false // Disable timestamp because we are handling createdAt and updatedAt manually, if we are setting this to true then it will create automatically createdAt and updatedAt with Date type.
})

const Products = mongoose.model<Product>("Products", productSchema);
export default Products;
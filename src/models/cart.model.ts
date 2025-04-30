import mongoose, { Types } from 'mongoose';
import moment from 'moment';
import Cart from '../interfaces/cart.interface';

const cartSchema = new mongoose.Schema<Cart>({
    userId: { type: Types.ObjectId, default: null, ref: "Users" },
    productId: { type: Types.ObjectId, default: null, ref: "Products" },
    quantity: { type: Number, default: 0 },
    createdAt: { type: Number, default: () => moment().utc().valueOf() },
    updatedAt: { type: Number, default: 0 },
}, {
    timestamps: false // Disable timestamp because we are handling createdAt and updatedAt manually, if we are setting this to true then it will create automatically createdAt and updatedAt with Date type.
})

const Carts = mongoose.model<Cart>("Carts", cartSchema);
export default Carts;
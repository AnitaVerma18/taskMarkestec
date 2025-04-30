import mongoose from 'mongoose';
import moment from 'moment';
import City from '../interfaces/city.interface';

const citySchema = new mongoose.Schema<City>({
    city: { type: String, default: null, required: true },
    country: { type: String, default: null, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    },
    createdAt: { type: Number, default: () => moment().utc().valueOf() },
    updatedAt: { type: Number, default: 0 },
}, {
    timestamps: false // Disable timestamp because we are handling createdAt and updatedAt manually, if we are setting this to true then it will create automatically createdAt and updatedAt with Date type.
})
citySchema.index({ location: '2dsphere' });
const City = mongoose.model<City>("City", citySchema);
export default City;
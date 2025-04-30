import mongoose, { Types } from 'mongoose';
import moment from 'moment';
import Airport from '../interfaces/airport.interface';
import { AirportType } from '../enums/airportType.enum';

const airportSchema = new mongoose.Schema<Airport>({
    name: {type:String, default:null},
    iata: {type:String, default:null},
    type: {type: String, enum: Object.values(AirportType), default: AirportType.NATIONAL},
    city: { type: Types.ObjectId, default: null, ref: "City" },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    },
    createdAt: { type: Number, default: () => moment().utc().valueOf() },
    updatedAt: { type: Number, default: 0 },
}, {
    timestamps: false // Disable timestamp because we are handling createdAt and updatedAt manually, if we are setting this to true then it will create automatically createdAt and updatedAt with Date type.
})
airportSchema.index({ location: '2dsphere' });
const Airports = mongoose.model<Airport>("Airports", airportSchema);
export default Airports;
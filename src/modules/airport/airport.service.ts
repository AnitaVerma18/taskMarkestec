import * as Models from '../../models/index';
import * as Handler from '../../handler/handler';
import { CityNotFound, ErrorResponse, ProvideCityAndCountry } from '../../handler/error';
import { CustomRequest } from '../../interfaces/common.interface';
import NearbyAirports from './aggregation/airport.aggregation';
import { AirportResponse } from '../../types/response';

const projection = { __v: 0 };
const option = { lean: true };

const airports = async (req: CustomRequest): Promise<AirportResponse> => {
    try {
        const { city, country, search } = req.query;
        if (!city || !country) {
            return Handler.handleCustomError(ProvideCityAndCountry);
        }

        const query = { city: city, country: country };
        const fetchCity = await Models.City.findOne(query, projection, option);
        if (!fetchCity) {
            return Handler.handleCustomError(CityNotFound);
        }
        const airports = await getNearbyAirports(
            fetchCity.location.coordinates,
            5, // limit the number of documents to find top five nearest airports
            search as string
        );

        const response: AirportResponse = {
            count: airports.length,
            data: airports
        }
        return response;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}

const getNearbyAirports = async (coordinates: [number, number], limit: number = 5, search?: string) => {
    try {
        const query: any = [
            await NearbyAirports.geonearStage(coordinates),
            await NearbyAirports.searchStage(search),
            await NearbyAirports.sortStage(),
            await NearbyAirports.limitStage(limit),
            await NearbyAirports.projectStage()
        ]
        const fetchData = await Models.Airports.aggregate(query);
        return fetchData;
    }
    catch (err) {
        return Handler.handleCustomError(err as ErrorResponse);
    }
}


export {
    airports
}
import { ErrorResponse } from '../../../handler/error';
import * as Handler from '../../../handler/handler';

export default class NearbyAirports {

    static geonearStage = async (coordinates: [number, number]) => {
        try {
            return {
                $geoNear: {
                    near: { type: 'Point', coordinates },
                    distanceField: 'distance',
                    spherical: true
                }
            };
        }
        catch (err) {
            return Handler.handleCustomError(err as ErrorResponse);
        }
    }

    static searchStage = async (search?: string) => {
        try {
            return {
                $redact: {
                    $cond: {
                        if: {
                            $or: [
                                { $eq: [search, undefined] },
                                {
                                    $regexMatch: {
                                        input: "$name",
                                        regex: search,
                                        options: "i"
                                    }
                                },
                                {
                                    $regexMatch: {
                                        input: "$iata",
                                        regex: search,
                                        options: "i"
                                    }
                                }
                            ]
                        },
                        then: "$$KEEP",
                        else: "$$PRUNE"
                    }
                }
            }
        }
        catch (err) {
            return Handler.handleCustomError(err as ErrorResponse);
        }
    }

    static sortStage = async () => {
        try {
            return {
                $sort: { distance: 1 }
            }
        }
        catch (err) {
            return Handler.handleCustomError(err as ErrorResponse);
        }
    }

    static limitStage = async (limit: number) => {
        try {
            return {
                $limit: limit
            }
        }
        catch (err) {
            return Handler.handleCustomError(err as ErrorResponse);
        }
    }

    static projectStage = async () => {
        try {
            return {
                $project: {
                    name: 1,
                    iata: 1,
                    type: 1,
                    distance: 1,
                },
            }
        }
        catch (err) {
            return Handler.handleCustomError(err as ErrorResponse);
        }
    }

}
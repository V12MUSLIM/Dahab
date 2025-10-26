import { RequestHandler } from "express";
import { IRestaurant, Restaurant } from "../restaurant-model";

interface IResponse {
    message?: string;
    restaurants?: IRestaurant | IRestaurant[];
}

export const getRestaurant: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const restaurants = await Restaurant.find().
        select("-_id-__v");
    if (!restaurants) {
        return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ restaurants })
}
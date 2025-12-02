import { RequestHandler } from "express";
import { IRestaurant, Restaurant } from "../restaurant-model";


interface IRequest extends IRestaurant {}

interface IResponse {
    message: string;
    updatedRestaurant?: IRestaurant ;
}

export const updateRestaurant: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedRestaurant=await Restaurant.findByIdAndUpdate(
                    {_id: req.params.id},
                    req.body,
                    {new: true, upsert: false}
                ).select("-_id -__v");
                if(!updatedRestaurant){
                    return res.status(404).json({message: "Restaurant not found"});
                }
                res.json(
                    {message: "Restaurant updated successfully", updatedRestaurant}
                )
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
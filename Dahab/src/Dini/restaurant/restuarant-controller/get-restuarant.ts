import { RequestHandler } from "express";
import { IRestaurant, Restaurant } from "../restuarant-model";

interface IResponse {
    message?: string ;
    resturants?: IRestaurant |IRestaurant[];
}

export const getResturant: RequestHandler<{}, IResponse,{}>= async (req,res) => {
    const resturants = await Restaurant.find().
    select("-_id-__v");
    if(!resturants){
        return res.status(404).json({message:"Resturant not found"});
    }
    res.json({resturants})
}
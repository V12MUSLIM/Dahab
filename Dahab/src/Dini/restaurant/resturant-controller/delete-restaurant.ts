import { RequestHandler } from "express";
import { Restaurant } from "../restaurant-model";


interface IResponse{
    message:string
}


export const deleteRestaurant:RequestHandler<{id:string},IResponse,{}>=async(req,res)=>{
    const restaurant=await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully" });
}
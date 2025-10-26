import { RequestHandler } from "express";
import { Destination, IDestination } from "../destination-model";


interface IResponse{
  message?:string
  destinations?:IDestination|IDestination[];
}


export const getDestination:RequestHandler<{},IResponse,{}> =async(req,res)=>{
    const destinations=await Destination.find().
    select("-_id -__v");
    if(!destinations){
        return res.status(404).json({message:"Destination not found"});
    }
    res.status(200).json({destinations});
}
import { RequestHandler } from "express";
import { Destination } from "../destination-model";



interface IResponse{
    message:string
}


export const deleteDestination:RequestHandler<{id:string},IResponse,{}>=async(req,res)=>{
    const destination=await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
    }
    res.json({ message: "Destination deleted successfully" });
}
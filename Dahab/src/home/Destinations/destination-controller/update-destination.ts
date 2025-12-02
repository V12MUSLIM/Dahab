import { RequestHandler } from "express";
import { Destination, IDestination } from "../destination-model";

interface IRequest extends IDestination {}

interface IResponse {
    message: string;
    updatedDestination?: IDestination ;
}

export const updateDestination: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedDestination=await Destination.findByIdAndUpdate(
                    {_id: req.params.id},
                    req.body,
                    {new: true, upsert: false}
                ).select("-_id -__v");
                if(!updatedDestination){
                    return res.status(404).json({message: "this destination not found"});
                }
                res.json(
                    {message: "Destination updated successfully", updatedDestination}
                )
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
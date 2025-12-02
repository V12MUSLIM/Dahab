import { RequestHandler } from "express";
import { Cafe, ICafe } from "../cafe-model";


interface IRequest extends ICafe {}

interface IResponse {
    message: string;
    updatedCafe?: ICafe ;
}

export const updateCafe: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedCafe=await Cafe.findByIdAndUpdate(
                    {_id: req.params.id},
                    req.body,
                    {new: true, upsert: false}
                ).select("-_id -__v");
                if(!updatedCafe){
                    return res.status(404).json({message: "Cafe not found"});
                }
                res.json(
                    {message: "Cafe updated successfully", updatedCafe}
                )
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
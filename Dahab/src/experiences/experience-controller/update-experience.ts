import { RequestHandler } from "express";
import { Experience, IExperience } from "../experience-model";


interface IRequest extends IExperience {}

interface IResponse {
    message: string;
    updatedExperience?: IExperience ;
}

export const updatedExperience: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedExperience=await Experience.findByIdAndUpdate(
                    {_id: req.params.id},
                    req.body,
                    {new: true, upsert: false}
                ).select("-_id -__v");
                if(!updatedExperience){
                    return res.status(404).json({message: "this experience not found"});
                }
                res.json(
                    {message: "Experience updated successfully", updatedExperience}
                )
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
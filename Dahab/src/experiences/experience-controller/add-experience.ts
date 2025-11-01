import { RequestHandler } from "express";
import { Experience, IExperience } from "../experience-model";

interface IRequest extends IExperience {}

interface IResponse{
    message : string ;
}

export const addExperience: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req , res) => {
    try{
        if(Array.isArray(req.body)) {
            await Experience.insertMany(req.body);
        } else {
            await Experience.create(req.body);
        }

        res.status(201).json({ message: "Experience(s) added successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message || "Error adding Experience"})
    }
}
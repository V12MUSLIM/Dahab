import { RequestHandler } from "express";
import { IExperience, Experience } from "../experience-model";

interface IResponse {
    message?: string;
    experiences?: IExperience | IExperience[];
}

export const getExperience: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const experiences = await Experience.find().
    select("-_id-__v");
    
    if(!experiences) {
        return res.status(404).json({ message: "Experience not found"});

    }
    res.json({ experiences })
}
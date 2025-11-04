import { RequestHandler } from "express";
import { Stay, IStay } from "../stay-model";

interface IRequest extends IStay {}

interface IResponse {
    message: string;
}

export const addStay: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req , res) => {
    try{
        if(Array.isArray(req.body)) {
            await Stay.insertMany(req.body);
        } else {
            await Stay.create(req.body);
        }

        res.status(201).json({ message: "Stay(s) added successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message || "Error adding Stay"})
    }
}

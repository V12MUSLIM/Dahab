import { RequestHandler } from "express";
import { Cafe, ICafe } from "../cafe-model";


interface IResponse {
    massege: string;
}

interface IRequest extends ICafe { 
}






export const addCafe: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await Cafe.insertMany(req.body);
        } else {
            await Cafe.create(req.body);
        }

        res.status(201).json({ massege: "Cafe(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ massege: error.message || "Error adding Cafe" });
    }
}
import { RequestHandler } from "express";
import { Banner, IBanner } from "../bannar-model";

interface IResponse {
    message: string;
}

interface IRequest extends IBanner {
}



export const addBanner: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {

    try {
        if (Array.isArray(req.body)) {
            await Banner.insertMany(req.body);
        } else {
            await Banner.create(req.body);
        }
        res.status(201).json({ message: "Banner(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error adding Banner" });
    }
}
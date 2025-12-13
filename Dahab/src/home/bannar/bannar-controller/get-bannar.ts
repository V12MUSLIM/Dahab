import { RequestHandler } from "express";
import { IBanner , Banner } from "../bannar-model";

interface IResponse {
    message?: string;
    banners?: IBanner | IBanner[];
}

export const getBanner: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const banners = await Banner.find().
    select("-_id-__v");
    if (!banners) {
        return res.status(404).json({ message: "Banner not found" });
    }
    res.json({ banners });
}
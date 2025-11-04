import { RequestHandler } from "express";
import { Stay, IStay } from "../stay-model";

interface IResponse {
    message?: string;
    stays?: IStay | IStay[] ;
}

export const getStay: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const stays = await Stay.find().select("-_id-__v");
    if (!stays) {
        return res.status(404).json({ message: "Stay not found" });
    }
    res.json({ stays });
};
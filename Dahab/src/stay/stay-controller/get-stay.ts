import { RequestHandler } from "express";
import { Stay, IStay } from "../stay-model";

interface IResponse {
    message?: string;
    stay?: IStay | IStay[] ;
}

export const getStay: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const stay = await Stay.find().select("-_id-__v");
    if (!stay) {
        return res.status(404).json({ message: "Stay not found" });
    }
    res.json({ stay });
};
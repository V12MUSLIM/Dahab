import { RequestHandler } from "express";
import { Cafe, ICafe } from "../cafe-model";

interface IResponse {
    message?: string;
    cafes?: ICafe | ICafe[];
}







export const getCages:RequestHandler<{},IResponse,{}> = async (req, res) => {
const cafes = await Cafe.find().select("-_id-__v");
    if (!cafes) {
        return res.status(404).json({ message: "Cafes not found" });
    }
    res.status(200).json({ cafes });


}
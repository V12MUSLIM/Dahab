import { RequestHandler } from "express";
import { Activities, Iactivities } from "../activities-model";


interface IResponse {
    message?:string;
    activities?:Iactivities|Iactivities[];
}

export const getActivities: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const activities = await Activities.find().
    select("title description icon duration groupSize difficulty price").exec();
    if (!activities) {
        return res.status(404).json({ message: "Activities not found" });
    }
    res.status(200).json({activities});
}

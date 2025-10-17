import { RequestHandler } from "express";
import { Activities, Iactivities } from "../activities-model";


interface IResponse {
    massage:string;
    activities:Iactivities[];
}

export const getActivities: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const activities = await Activities.find().
    select("title description icon duration groupSize difficulty price")

    // activities.map((ac) => ({
    //     title: ac.title,
    //     description: ac.description,
    //     icon: ac.icon,
    //     duration: ac.duration,
    //     groupSize: ac.groupSize,
    //     difficulty: ac.difficulty,
    //     price: ac.price
    // }));
    res.status(200).json({massage:"activities:",activities});
}

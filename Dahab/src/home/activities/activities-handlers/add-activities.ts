import { RequestHandler } from "express";
import { Activities, Iactivities } from "../activities-model";


interface IRequest {
    title: string;
    description: string;
    icon: string;
    duration: string;
    groupSize: number;
    difficulty: string
    price: number;
}
interface IResponse {
    massage: string;
    response: Iactivities | Iactivities[];
}



export const addActivities: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {
    const activities = await Activities.create(req.body)
    if (Array.isArray(activities)) {
        const response = activities.map((ac) => ({
            title: ac.title,
            description: ac.description,
            icon: ac.icon,
            duration: ac.duration,
            groupSize: ac.groupSize,
            difficulty: ac.difficulty,
            price: ac.price,
        }));
        return res.status(201).json({ massage: "activities added successfully", response })
    }
    const response = {
        title: activities.title,
        description: activities.description,
        icon: activities.icon,
        duration: activities.duration,
        groupSize: activities.groupSize,
        difficulty: activities.difficulty,
        price: activities.price
    }
    res.status(201).json({ massage: "activities added successfully", response })
}


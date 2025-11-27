import e, { RequestHandler } from "express";
import { Activities, IActivities } from "../activities-model";

interface IRequest extends Partial<IActivities> {
}

interface IResponse {
    message: string;
    updateActivitie?: IActivities;
}

export const updateActivities: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updateActivitie=await Activities.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, upsert: false}
        ).select("-_id -__v");
        if(!updateActivitie){
            return res.status(404).json({message: "Activitie not found"});
        }
        res.json(
            {message: "Activitie updated successfully", updateActivitie}
        )
    } catch (error: any) {
        res.status(500).json({ message: error.message || "internal server error" });
    }
};

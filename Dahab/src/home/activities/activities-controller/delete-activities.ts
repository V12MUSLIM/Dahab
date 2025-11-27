import { RequestHandler } from "express";
import { Activities } from "../activities-model";

interface IResponse {
    message: string;
}

export const deleteActivities: RequestHandler<{ id: string }, IResponse, {}> = async (req, res) => {
    try {
        const activitie = await Activities.findByIdAndDelete(req.params.id);

        if (!activitie) {
            return res.status(404).json({ message: "Activities not found" });
        }

        return res.status(200).json({ message: "Activities deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

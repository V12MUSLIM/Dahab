import { RequestHandler } from "express";
import { Stay } from "../stay-model";

interface IResponse {
    message: string;
}

export const deleteStay: RequestHandler<{ id: string }, IResponse, {}> = async (req, res) => {
    try {
        const stay = await Stay.findByIdAndDelete(req.params.id);

        if (!stay) {
            return res.status(404).json({ message: "Stay not found" });
        }

        return res.status(200).json({ message: "Stay deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

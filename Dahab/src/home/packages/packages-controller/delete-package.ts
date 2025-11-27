import { RequestHandler } from "express";
import { Package } from "../packages-model";


interface IResponse {
    message: string;
}

export const deletepackages: RequestHandler<{ id: string }, IResponse, {}> = async (req, res) => {
    try {
        const deletepackage = await Package.findByIdAndDelete(req.params.id);

        if (!deletepackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        return res.status(200).json({ message: "Package deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

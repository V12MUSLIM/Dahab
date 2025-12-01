import { RequestHandler } from "express";
import { IStay, Stay } from "../stay-model";

interface IRequest extends Partial<IStay> {}

interface IResponse {
    message: string;
    updateStay?: any; // Change this to any to avoid type issues
}

export const updateStays: RequestHandler<{ id: string }, IResponse, IRequest> = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, __v, ...allowedUpdates } = req.body as any;

        // Find the category that contains this stay
        const category = await Stay.findOne({ "stays._id": id });
        
        if (!category) {
            return res.status(404).json({ message: "Stay not found" });
        }

        // Update the specific stay within the category
        const updatedCategory = await Stay.findOneAndUpdate(
            { "stays._id": id },
            { 
                $set: Object.keys(allowedUpdates).reduce((acc, key) => {
                    acc[`stays.$.${key}`] = allowedUpdates[key];
                    return acc;
                }, {} as any)
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Failed to update stay" });
        }

        // Find the updated stay
        const updatedStay = updatedCategory.stays.find((s: any) => s._id.toString() === id);

        res.json({
            message: "Stay updated successfully",
            updateStay: updatedStay,
        });

    } catch (error: any) {
        console.error("Update error:", error);
        res.status(500).json({
            message: error.message || "internal server error",
        });
    }
};
import { RequestHandler } from "express";
import { IStay, Stay } from "../stay-model";

interface UpdateStayBody {
    roomTypes?: any[];
    [key: string]: any;
}

interface IResponse {
    message: string;
    updateStay?: any;
}

export const updateStays: RequestHandler<{ id: string }, IResponse, UpdateStayBody> =
async (req, res) => {
    try {
        const { id } = req.params;
        const { roomTypes, ...otherFields } = req.body;

        // Find category containing this stay
        const category = await Stay.findOne({ "stays._id": id });
        if (!category) {
            return res.status(404).json({ message: "Stay not found" });
        }

        const updateQuery: any = {};

        // Update non-room fields
        const otherFieldsDict = otherFields as Record<string, any>;
        for (const key of Object.keys(otherFieldsDict)) {
            updateQuery[`stays.$.${key}`] = otherFieldsDict[key];
        }

        // Update roomTypes (must be array)
        if (roomTypes) {
            if (!Array.isArray(roomTypes)) {
                return res.status(400).json({ message: "roomTypes must be an array" });
            }
            updateQuery["stays.$.roomTypes"] = roomTypes;
        }

        const updatedCategory = await Stay.findOneAndUpdate(
            { "stays._id": id },
            { $set: updateQuery },
            { new: true }
        );

        const updatedStay = updatedCategory?.stays?.find((s: any) => s._id.toString() === id);

        res.json({
            message: "Stay updated successfully",
            updateStay: updatedStay,
        });

    } catch (error: any) {
        console.error("Update error:", error);
        res.status(500).json({ message: error.message || "internal server error" });
    }
};

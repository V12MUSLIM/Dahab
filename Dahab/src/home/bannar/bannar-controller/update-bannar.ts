import { RequestHandler } from "express";
import { IBanner , Banner  } from "../bannar-model";

interface IRequest extends IBanner {}

interface IResponse {
    message: string;
    banner?: IBanner;
}

export const updateBanner: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        ).select("-__v");
        
        if (!updatedBanner) {
            return res.status(404).json({ message: "Banner not found" });
        }
        
        res.json({
            message: "Banner updated successfully",
            banner: updatedBanner
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
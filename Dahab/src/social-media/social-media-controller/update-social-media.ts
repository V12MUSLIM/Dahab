import { RequestHandler } from "express";
import { ISocialMedia, SocialMedia } from "../social-media-model";

interface IRequest {
    name?: string; // ممكن تعتمد على الاسم أو الـ _id، زي ما تحب
    icon?: string;
    href?: string;
    label?: string;
    color?: string;
}

interface IResponse {
    message: string;
    updatedSocialMedia?: ISocialMedia | null;
}

export const updateSocialMedia: RequestHandler<{}, IResponse, IRequest> = async (req, res) => {
    try {
        const { name, ...updateData } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required to update social media" });
        }

        const updatedSocialMedia = await SocialMedia.findOneAndUpdate(
            { name },
            updateData,
            { new: true } // يرجع النسخة بعد التحديث
        ).select("-__v");

        if (!updatedSocialMedia) {
            return res.status(404).json({ message: "Social media not found" });
        }

        res.status(200).json({
            message: "Social media updated successfully",
            updatedSocialMedia,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error updating social media" });
    }
};

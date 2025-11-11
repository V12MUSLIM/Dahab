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
    updatedSocialMedia?: ISocialMedia;
}

export const updateSocialMedia: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedSocialMedia=await SocialMedia.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, upsert: false}
        ).select("-_id -__v");
        if(!updatedSocialMedia){
            return res.status(404).json({message: "Social Media not found"});
        }
        res.json(
            {message: "Social Media updated successfully", updatedSocialMedia}
        )
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error updating social media" });
    }
};

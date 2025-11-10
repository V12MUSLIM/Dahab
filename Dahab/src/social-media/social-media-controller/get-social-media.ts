    import { RequestHandler } from "express";
    import { ISocialMedia, SocialMedia } from "../social-media-model";

    interface IResponse {
        message?: string;
        socialMediaes?: ISocialMedia | ISocialMedia[];
    }


    export const getSocialMedia: RequestHandler<{}, IResponse, {}> = async (req, res) => {

        const socialMediaes = await SocialMedia.find().select("-_id-__v");
        if (!socialMediaes) {
            return res.status(404).json({ message: "Social Media not found" });
        }
        res.json({ socialMediaes });

    }
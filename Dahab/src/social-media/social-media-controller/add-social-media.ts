import { RequestHandler } from "express";
import { ISocialMedia, SocialMedia } from "../social-media-model";

interface IRequest extends ISocialMedia { }

interface IResponse {
  message: string;
}

export const addSocialMedia: RequestHandler<{},IResponse,IRequest | IRequest[]> = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      await SocialMedia.insertMany(req.body);
    } else {
      await SocialMedia.create(req.body);
    }

    res.status(201).json({ message: "Social Media(s) added successfully" });
  } catch (error: any) {
    console.error("ADD SOCIAL MEDIA ERROR:", error);
    res
      .status(500)
      .json({ message: error.message || "Error adding Social Media" });
  }
};

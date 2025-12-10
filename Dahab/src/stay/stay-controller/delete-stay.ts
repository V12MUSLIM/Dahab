import { RequestHandler } from "express";
import { Stay } from "../stay-model";

interface IResponse {
  message: string;
}

export const deleteStay: RequestHandler<{ id: string }, IResponse> = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the parent document containing this stay
    const parentDoc = await Stay.findOne({ "stays._id": id });

    if (!parentDoc) {
      return res.status(404).json({ message: "Stay not found" });
    }

    // Remove the stay from the stays array
    parentDoc.stays = parentDoc.stays.filter(
      (stay: any) => stay._id.toString() !== id
    );

    await parentDoc.save();

    return res.status(200).json({ message: "Stay deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

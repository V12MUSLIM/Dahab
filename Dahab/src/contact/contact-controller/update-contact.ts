import { RequestHandler } from "express";
import { Contact, IContact } from "../contact-models";

interface IRequest extends Partial<IContact> {
    _id?: string; // optional لو هنستخدم ID للتحديد
}

interface IResponse {
    message: string;
    updatedContact?: IContact | null;
}

export const updateContact: RequestHandler<{}, IResponse, IRequest> = async (req, res) => {
    try {
        const { _id, phone, email } = req.body;
        
        const filter = _id ? { _id } : {};

        const updated = await Contact.findOneAndUpdate(
            filter,
            { phone, email },
            { new: true, upsert: false } 
        ).select("-_id -__v");

        if (!updated) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact updated successfully", updatedContact: updated });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
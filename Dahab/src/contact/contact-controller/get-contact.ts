import { RequestHandler } from "express";
import { Contact, IContact } from "../contact-models";

interface IResponse {
    message?: string;
    contacts?: IContact | IContact[];
}

export const getContact: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const contacts = await Contact.find().
    select("-_id-__v");
    if (!contacts) {
        return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ contacts });
}
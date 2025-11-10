import { RequestHandler } from "express";
import { Contact, IContact } from "../contact-models";

interface IRequest extends IContact {

}

interface IResponse {
    message: string
}

export const addContact: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {
    
    const contact=await Contact.create(req.body);
    if(!contact){
        return res.status(500).json({ message: "Error adding Contact" });
    }
    res.status(201).json({ message: "Contact added successfully" });
}
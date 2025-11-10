import { RequestHandler } from "express";
import { Contact, IContact } from "../contact-models";

interface IRequest extends IContact {}

interface IResponse {
    message: string;
    updatedContact?: IContact ;
}

export const updateContact: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedContact=await Contact.findByIdAndUpdate(
                    {_id: req.params.id},
                    req.body,
                    {new: true, upsert: false}
                ).select("-_id -__v");
                if(!updatedContact){
                    return res.status(404).json({message: "this contact not found"});
                }
                res.json(
                    {message: "Contact updated successfully", updatedContact}
                )
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
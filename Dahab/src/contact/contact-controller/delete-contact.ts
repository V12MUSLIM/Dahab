import { RequestHandler } from "express";
import { Contact } from "../contact-models";


interface IResponse{
    message:string
}


export const deleteContact:RequestHandler<{id:string},IResponse,{}>=async(req,res)=>{
    const contact=await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
}
import { RequestHandler } from "express";
import { SocialMedia } from "../social-media-model";




interface IResponse{
    message:string
}


export const deleteSocialMedia:RequestHandler<{id:string},IResponse,{}>=async(req,res)=>{
    const socialMedia=await SocialMedia.findByIdAndDelete(req.params.id);
    if (!socialMedia) {
        return res.status(404).json({ message: "Social Media not found" });
    }
    res.json({ message: "Social Media deleted successfully" });
}
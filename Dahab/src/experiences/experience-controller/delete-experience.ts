import { RequestHandler } from "express";
import { Experience } from "../experience-model";



interface IResponse{
    message:string
}


export const deleteExperience:RequestHandler<{id:string},IResponse,{}>=async(req,res)=>{
    const experience=await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
}
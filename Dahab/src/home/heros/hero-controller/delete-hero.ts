import { RequestHandler } from "express";
import { Hero } from "../hero-model";



interface IResponse{
    message:string
}


export const deleteHero:RequestHandler<{id:string},IResponse,{}>=async(req,res)=>{
    const hero=await Hero.findByIdAndDelete(req.params.id);
    if (!hero) {
        return res.status(404).json({ message: "Hero not found" });
    }
    res.json({ message: "Hero deleted successfully" });
}
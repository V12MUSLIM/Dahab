import { RequestHandler } from "express";
import { Cafe } from "../cafe-model";



interface IResponse{
    message:string
}


export const deleteCafe:RequestHandler<{id:string},IResponse,{}>=async(req,res)=>{
    const cafe=await Cafe.findByIdAndDelete(req.params.id);
    if (!cafe) {
        return res.status(404).json({ message: "cafe not found" });
    }
    res.json({ message: "cafe deleted successfully" });
}
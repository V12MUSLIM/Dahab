import { RequestHandler } from "express";
import { Hero, IHero } from "../hero-model";

interface IResponse{
    message?:string
    hero?:IHero|IHero[]
}

export const getHero:RequestHandler<{section:string},IResponse,{}>=async(req,res)=>{
    const hero = await Hero.find({section:req.params.section }).
    select("__id image title subtitle badge primaryCta secondaryCta stats").exec();
    if (!hero) 
        return res.status(404).json({ message: "Section not found" });
    res.json({message:"success",hero});
}
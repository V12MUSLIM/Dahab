import { RequestHandler } from "express";
import { Hero, IHero } from "../hero-model";


interface IRequest extends IHero {}

interface IResponse {
    message: string;
    updatedHero?: IHero ;
}

export const updateHero: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatedHero=await Hero.findByIdAndUpdate(
                    {_id: req.params.id},
                    req.body,
                    {new: true, upsert: false}
                ).select("-_id -__v");
                if(!updatedHero){
                    return res.status(404).json({message: "this hero not found"});
                }
                res.json(
                    {message: "Hero updated successfully", updatedHero}
                )
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
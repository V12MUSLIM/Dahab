import e, { RequestHandler } from "express";
import { IStay, Stay } from "../stay-model";


interface IRequest extends Partial<IStay> {
}

interface IResponse {
    message: string;
    updateStay?: IStay;
}

export const updateActivities: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updateStay=await Stay.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, upsert: false}
        ).select("-_id -__v");
        if(!updateStay){
            return res.status(404).json({message: "Stay not found"});
        }
        res.json(
            {message: "Stay updated successfully", updateStay}
        )
    } catch (error: any) {
        res.status(500).json({ message: error.message || "internal server error" });
    }
};

import e, { RequestHandler } from "express";
import { IPackage, Package } from "../packages-model";


interface IRequest extends Partial<IPackage> {
}

interface IResponse {
    message: string;
    updatePackage?: IPackage;
}

export const updatePackages: RequestHandler<{id: string}, IResponse, IRequest> = async (req, res) => {
    try {
        const updatePackage=await Package.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, upsert: false}
        ).select("-_id -__v");
        if(!updatePackage){
            return res.status(404).json({message: "Package not found"});
        }
        res.json(
            {message: "Package updated successfully", updatePackage}
        )
    } catch (error: any) {
        res.status(500).json({ message: error.message || "internal server error" });
    }
};

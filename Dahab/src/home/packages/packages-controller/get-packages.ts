import { RequestHandler } from "express";
import { IPackage, Package } from "../packages-model";

interface IResponse {
    message?: string;
    packages?: IPackage|IPackage[];
}


export const allPackages: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const packages = await Package.find({}).select("-_id -__v");
    if (!packages) {
        return res.status(404).json({ message: "Packages not found" });
    }
    res.json({packages });
}






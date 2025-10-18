import { RequestHandler } from "express";
import { IPackage, Package } from "../packages-model";

interface IResponse {
    message?: string;
    packages?: IPackage|IPackage[];
}


export const allPackages: RequestHandler<{}, IResponse, {}> = async (req, res) => {
    const packages = await Package.find({});
    res.json({ message: "success", packages });
}






import { RequestHandler } from "express";
import { Package } from "../packages-model";




export const allPackages: RequestHandler<{}, {}, {}> = async (req, res) => {
    const packages = await Package.find({});
    res.json(packages);
}






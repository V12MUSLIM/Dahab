import { RequestHandler } from "express";
import { IPackage, Package } from "../packages-model";

interface IRequest extends IPackage {
}

interface IResponse {
    message: string;
}

export const addPackage: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await Package.insertMany(req.body);
        } else {
            (await Package.create(req.body));
        }

        res.status(201).json({ message: "Package(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error adding packages" });
    }
};
//   title: string;
//     price: number;
//     duration: string;
//     features: string[];
//     popular: boolean;
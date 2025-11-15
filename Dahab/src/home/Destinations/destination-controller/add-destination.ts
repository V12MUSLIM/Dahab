import { RequestHandler } from "express";
import { Destination, IDestination } from "../destination-model";

interface IRequest extends IDestination {

}

export const addDestination: RequestHandler<{}, {}, IRequest | IRequest[]> = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const data = req.body as any;

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            if (files?.image?.[0]) {
                data.image = `/uploads/${files.image[0].filename}`;
            }

            if (files?.galleryImages) {
                data.galleryImages = files.galleryImages.map((file) => ({
                    src: `/uploads/${file.filename}`,
                    alt: data.title || "Gallery image",
                    title: data.title || "",
                    description: data.description || "",
                }));
            }

            await Destination.insertMany(req.body);
        } else {
            const data = req.body as any;

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            if (files?.image?.[0]) {
                data.image = `/uploads/${files.image[0].filename}`;
            }

            
            if (files?.galleryImages) {
                data.galleryImages = files.galleryImages.map((file) => ({
                    src: `/uploads/${file.filename}`,
                    alt: data.title || "Gallery image",
                    title: data.title || "",
                    description: data.description || "",
                }));
            }

            await Destination.create(req.body);
        }

        res.status(201).json({ message: "Destination(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error adding Destination" });
    }
}







// import { RequestHandler } from "express";
// import { Destination, IDestination } from "../destination-model";

// interface IRequest extends IDestination {

// }

// export const addDestination: RequestHandler<{}, {}, IRequest | IRequest[]> = async (req, res) => {
//     try {
//         if (Array.isArray(req.body)) {
//             await Destination.insertMany(req.body);
//         } else {
            
//             await Destination.create(req.body);
//         }

//         res.status(201).json({ message: "Destination(s) added successfully" });
//     } catch (error: any) {
//         res.status(500).json({ message: error.message || "Error adding Destination" });
//     }
// }



import { RequestHandler } from "express";
import { Booking } from "./booking-model";





export const createBooking: RequestHandler = async (req, res) => {
    console.log("BODY ====>", req.body);
    try {
        const booking = await Booking.create({
            ...req.body,
            paymentDetails: {
                paymentIntentId: "",
                status: "pending",
                amount: req.body.amount,
                currency: "usd",
            },
        });
        

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Error adding booking",
        });
    }
};




// import { RequestHandler } from "express";
// import { Booking, IBooking } from "./booking-model";


// interface IResponse {
//     message: string
// }

// export const createBooking:RequestHandler<{},IResponse> = async (req, res) => {
//     try{
//         await Booking.create({
//             ...req.body,
//             paymentDetails: {
//                 paymentIntentId: "",
//                 status: "pending",
//                 amount:req.body.amount,
//                 currency: "usd",
//             }
//         });
//         res.status(201).json({message:"Booking added successfully"});

//     } catch (error: any) {
//         res.status(500).json({message:error.message || "Error adding Booking"});
//     }
// }
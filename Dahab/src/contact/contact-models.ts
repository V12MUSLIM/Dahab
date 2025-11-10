import mongoose from "mongoose";

export interface IContact {
    phone: string;
    email: string;
}

export const ContactSchema = new mongoose.Schema<IContact>({
    phone: { type: String, required: true },
    email: { type: String, required: true },
});

export const Contact = mongoose.model<IContact>(
    "Contact", 
    ContactSchema, 
    "contacts"
);
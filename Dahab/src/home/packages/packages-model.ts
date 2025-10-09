import mongoose, { Schema } from "mongoose";

export interface IPackage {
    title: string;
    price: number;
    duration: string;
    features: string[];
    popular: boolean;
}

const PackageSchema = new Schema<IPackage>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        default: []
    },
    popular: {
        type: Boolean,
        default: false
    },
});

export const Package = mongoose.model<IPackage>("Package", PackageSchema, "packages");

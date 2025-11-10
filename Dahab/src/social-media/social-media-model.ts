import mongoose from "mongoose";

export interface ISocialMedia {
    name: string;
    icon: string;
    href?: string;
    label: string;
    color: string;
}

export const SocialMediaSchema = new mongoose.Schema<ISocialMedia>({
    name: { 
        type: String,
        required: true 
    },
    icon: {
        type: String,
        required: true
    },
    href: {
        type: String 
    },
    label: {
        type: String,
        required: true
    },
    color: { 
        type: String,
        required: true
    },
});

export const SocialMedia = mongoose.model<ISocialMedia>("SocialMedia",SocialMediaSchema);
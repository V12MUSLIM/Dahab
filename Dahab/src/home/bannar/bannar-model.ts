import mongoose from "mongoose";

export interface IBanner {
    active: boolean;
    version: string;
    backgroundImage: string;
    primaryColor: string;
    showIcon: boolean;
    mobileTitle: string;
    mobileSubtitle: string;
    mobileButtonText: string;
    desktopTitle: string;
    desktopSubtitle: string;
    desktopButtonText: string;
    buttonLink: string;
}

const BannerSchema = new mongoose.Schema<IBanner>(
    {
        active: { type: Boolean, required: true, default: true },
        version: { type: String, required: true, default: "1.0" },
        backgroundImage: { type: String, required: true },
        primaryColor: { type: String, required: true },
        showIcon: { type: Boolean, required: true, default: true },
        mobileTitle: { type: String, required: true },
        mobileSubtitle: { type: String, required: true },
        mobileButtonText: { type: String, required: true },
        desktopTitle: { type: String, required: true },
        desktopSubtitle: { type: String, required: true },
        desktopButtonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
    },
    { timestamps: true }
);

export const Banner = mongoose.model<IBanner>(
    "Banner",
    BannerSchema,
    "banners"
);
import mongoose, { Schema } from "mongoose";


export interface CTA {
    label: string;
    icon: string;
    href?: string;
}

export interface Stat {
    icon: string;
    text: string;
}

export interface IHero {
    section: string;
    image: string;
    title: string;
    highlight?: string;
    subtitle: string;
    badge: string;
    icon: string;
    description?: string;
    primaryCta: CTA;
    secondaryCta: CTA;
    stats: Stat[];
}

const CTASchema = new Schema<CTA>(
    {
        label: { type: String, required: true },
        icon: { type: String, required: true },
        href: { type: String },
    },
);

const StatSchema = new Schema<Stat>(
    {
        icon: { type: String, required: true },
        text: { type: String, required: true },
    },
);

const HeroSchema = new Schema<IHero>(
    {
        section: { type: String, required: true },
        image: { type: String, required: true },
        title: { type: String, required: true },
        highlight: { type: String },
        subtitle: { type: String, required: true },
        badge: { type: String, required: true },
        icon: { type: String, required: true },
        description: { type: String },
        primaryCta: { type: CTASchema, required: true },
        secondaryCta: { type: CTASchema, required: true },
        stats: { type: [StatSchema], required: true },
    },
    { timestamps: true }
);

export const Hero = mongoose.model<IHero>("Hero", HeroSchema);

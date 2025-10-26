import { RequestHandler } from "express";
import { CTA, Hero, Stat } from "../hero-model";

interface IRequest {
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

interface IResponse {
    message: string;
}

export const addHero: RequestHandler<{}, IResponse, IRequest | IRequest[]> = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await Hero.insertMany(req.body);
        } else {
            await Hero.create(req.body);
        }

        res.status(201).json({ message: "Hero(s) added successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error adding Heros" });
    }
};

import mongoose, { Schema } from "mongoose";

export interface IHero {
}

const heroSchema = new Schema<IHero>({});



export const Hero = mongoose.model<IHero>("Hero", heroSchema, "heros");

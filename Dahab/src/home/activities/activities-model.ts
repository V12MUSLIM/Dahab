import mongoose, { Schema } from "mongoose";


export interface Iactivities {
    title:string;
    description:string;
    icon:string;
    duration:string;
    groupSize:number;
    difficulty:string
    price:number;
}

const activitiesSchema= new Schema<Iactivities>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    groupSize: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


export const Activities=mongoose.model<Iactivities>("activities",activitiesSchema,"activities")

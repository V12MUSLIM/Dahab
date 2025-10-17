import mongoose, { Schema } from "mongoose";


export enum Role {
    User = "user",
    Admin = "admin",
}
export interface IUser {
    name: string;
    email: string;
    password: string;
    // confirmPassword: string;
    isVerified: boolean;
    role?: Role;
}
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    // confirmPassword: {
    //     type: String,
    //     required: [true, "Confirm Password is required"]
    // },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: [Role.Admin, Role.User],
        default: Role.User
    },
});

export const User = mongoose.model<IUser>("User", UserSchema, "users");

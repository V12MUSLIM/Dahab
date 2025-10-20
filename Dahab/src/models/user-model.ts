import mongoose, { Schema } from "mongoose";

export enum Role {
    User = "user",
    Admin = "admin",
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
    isVerified: boolean;
    role: Role;
    googleId?: string;
    picture?: string; 
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
        required: function(this: IUser) {
            return !this.googleId;
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: [Role.Admin, Role.User],
        default: Role.User
    },
    googleId: {
        type: String,
        sparse: true, 
        unique: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true 
});

export const User = mongoose.model<IUser>("User", UserSchema, "users");
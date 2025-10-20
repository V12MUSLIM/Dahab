import e from "express";

declare namespace NodeJS {
    interface ProcessEnv {
        SESSION_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
    }
}
export {};
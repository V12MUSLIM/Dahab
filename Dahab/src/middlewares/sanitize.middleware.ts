import { Request, Response, NextFunction } from "express";
import xss from "xss";

declare global {
    namespace Express {
        interface Request {
            safeQuery?: any;
            safeBody?: any;
            safeParams?: any;
        }
    }
}

const sanitizeValue = (value: any): any => {
    if (typeof value === "string") return xss(value);
    if (Array.isArray(value)) return value.map(sanitizeValue);
    if (typeof value === "object" && value !== null) {
        const out: any = Array.isArray(value) ? [] : {};
        for (const k in value) {
            out[k] = sanitizeValue(value[k]);
        }
        return out;
    }
    return value;
};

export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const rawQuery = (typeof req.query === "object" && req.query !== null) ? { ...req.query } : {};
        const rawBody = (typeof req.body === "object" && req.body !== null) ? { ...req.body } : {};
        const rawParams = (typeof req.params === "object" && req.params !== null) ? { ...req.params } : {};

        req.safeQuery = sanitizeValue(rawQuery);
        req.safeBody = sanitizeValue(rawBody);
        req.safeParams = sanitizeValue(rawParams);
    } catch (err) {
        return next(err);
    }
    next();
};

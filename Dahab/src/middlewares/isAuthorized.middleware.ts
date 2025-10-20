import { RequestHandler } from "express";
import { Role } from "../models/user-model";

export const isAuthorized = (...roles: Role[]): RequestHandler => {
  return (req, res, next) => {
    if (req.user) {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

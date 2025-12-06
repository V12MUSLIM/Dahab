import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

export const jwtService = {
  createToken(payload: object, opts?: jwt.SignOptions) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h", ...opts });
  },

  verifyToken<T = any>(token: string): T | null {
    try {
      return jwt.verify(token, JWT_SECRET) as T;
    } catch (err) {
      return null;
    }
  },

  decodeToken(token: string) {
    return jwt.decode(token);
  },
};
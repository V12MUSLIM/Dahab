    // jwt.service.ts simple wrapper
    import jwt from "jsonwebtoken";

    const SECRET = process.env.secretKey!;
    if (!SECRET) throw new Error("JWT_SECRET not set");

    export const jwtService = {
    createToken(payload: object, opts?: jwt.SignOptions) {
        return jwt.sign(payload, SECRET, { ...(opts ?? { expiresIn: "2h" }) });
    },
    verifyToken<T = any>(token: string) {
        return jwt.verify(token, SECRET) as T;
    },
    };
    export default jwtService;

//     import jwt, { SignOptions } from "jsonwebtoken";
// function createToken(
//     payload: Record<string, unknown>,
//     options: SignOptions = { expiresIn: "1d" }
// )
// {
//     const token = jwt.sign(payload, process.env.secretKey!, options);
//     return token;
// }

// export const jwtService = {
//     createToken,
// };

// export default jwtService;
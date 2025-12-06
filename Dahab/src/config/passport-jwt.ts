import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user-model"; // عدل المسار

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
            return req?.cookies?.token || null;  // ← اسم الكوكي
        }
    ]),
    secretOrKey: process.env.secretKey!,
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await User.findById(payload.id); // أو payload._id
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user-model";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
        },
        async (_, __, profile, done) => {
            try {
                const email = profile.emails?.[0].value;


                let user = await User.findOne({ email });
                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email,
                        provider: "google",
                        avatar: profile.photos?.[0].value,
                    });
                }


                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);


export default passport;

// import passport from "passport";
// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import { User } from "../models/user-model"; // عدل المسار

// const opts = {
//     jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => {
//             return req?.cookies?.token || null;  // ← اسم الكوكي
//         }
//     ]),
//     secretOrKey: process.env.secretKey!,
// };

// passport.use(
//     new JwtStrategy(opts, async (payload, done) => {
//         try {
//             const user = await User.findById(payload.id); // أو payload._id
//             if (!user) return done(null, false);
//             return done(null, user);
//         } catch (error) {
//             return done(error, false);
//         }
//     })
// );

// export default passport;

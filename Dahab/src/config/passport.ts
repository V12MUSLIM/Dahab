import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { User } from "../models/user-model";
import "dotenv/config";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackURL:
                process.env.GOOGLE_CALLBACK_URL ||
                "http://localhost:5000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile: Profile, done) => {
            try {
                
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        picture: profile.photos?.[0].value,
                        isVerified: true,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    // try {
    //     const user = await User.findById(id);
    //     done(null, user);
    // } catch (err) {
    //     done(err, null);
    // }
    User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

export default passport;

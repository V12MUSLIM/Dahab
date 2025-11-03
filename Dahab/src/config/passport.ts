import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { User } from "../models/user-model";
import { emailService } from "../services/emailService";
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
        async (_accessToken, _refreshToken, profile: Profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                const email = profile.emails?.[0]?.value;
                const picture = profile.photos?.[0]?.value;

                if (!user) {
                    
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email,
                        picture,
                        isVerified: true,
                    });

                    
                    try {
                        await emailService.sendGoogleWelcomeEmail(email!, profile.displayName);
                        console.log(`✅ Welcome email sent to ${email}`);
                    } catch (mailError) {
                        console.error("❌ Failed to send welcome email:", mailError);
                    }
                } else {
                    
                    if (picture && user.picture !== picture) {
                        user.picture = picture;
                        await user.save();
                    }
                }

                return done(null, user);
            } catch (error) {
                console.error("❌ Google Strategy Error:", error);
                return done(error, undefined);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id).lean();
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;

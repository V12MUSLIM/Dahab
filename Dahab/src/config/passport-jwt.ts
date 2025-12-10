// passport-jwt.ts


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
                console.log("=== Google Strategy Called ===");
                console.log("Profile ID:", profile.id);
                console.log("Profile Email:", profile.emails?.[0]?.value);

                const email = profile.emails?.[0]?.value;
                const picture = profile.photos?.[0]?.value;

                if (!email) {
                    console.error("❌ No email found in Google profile");
                    return done(new Error("No email provided by Google"), undefined);
                }

                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    console.log("Creating new user...");
                    
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email,
                        picture,
                        isVerified: true,
                    });

                    console.log("✅ User created:", user._id);

                    // Send welcome email in background (won't block OAuth flow)
                    emailService.sendGoogleWelcomeEmail(email, profile.displayName)
                        .then(() => console.log(`✅ Welcome email sent to ${email}`))
                        .catch((err) => console.error("❌ Failed to send welcome email:", err));
                } else {
                    console.log("✅ Existing user found:", user._id);
                    
                    // Update picture if changed
                    if (picture && user.picture !== picture) {
                        user.picture = picture;
                        await user.save();
                        console.log("✅ User picture updated");
                    }
                }

                console.log("✅ Returning user to passport");
                return done(null, user);
            } catch (error) {
                console.error("❌ Google Strategy Error:", error);
                console.error("Error details:", error instanceof Error ? error.message : error);
                console.error("Stack trace:", error instanceof Error ? error.stack : "");
                return done(error, undefined);
            }
        }
    )
);

export default passport;

// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// import { User } from "../models/user-model";
// import { emailService } from "../services/emailService";
// import "dotenv/config";

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//             callbackURL:
//                 process.env.GOOGLE_CALLBACK_URL ||
//                 "http://localhost:5000/api/auth/google/callback",
//         },
//         async (_accessToken, _refreshToken, profile: Profile, done) => {
//             try {
//                 let user = await User.findOne({ googleId: profile.id });
//                 const email = profile.emails?.[0]?.value;
//                 const picture = profile.photos?.[0]?.value;

//                 if (!user) {
                    
//                     user = await User.create({
//                         googleId: profile.id,
//                         name: profile.displayName,
//                         email,
//                         picture,
//                         isVerified: true,
//                     });

                    
//                     try {
//                         await emailService.sendGoogleWelcomeEmail(email!, profile.displayName);
//                         console.log(`✅ Welcome email sent to ${email}`);
//                     } catch (mailError) {
//                         console.error("❌ Failed to send welcome email:", mailError);
//                     }
//                 } else {
                    
//                     if (picture && user.picture !== picture) {
//                         user.picture = picture;
//                         await user.save();
//                     }
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 console.error("❌ Google Strategy Error:", error);
//                 return done(error, undefined);
//             }
//         }
//     )
// );

// passport.serializeUser((user: any, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser(async (id: string, done) => {
//     try {
//         const user = await User.findById(id).lean();
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// export default passport;


// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { User } from "../models/user-model";


// passport.use(
//     new GoogleStrategy(
//         {
//             clientID:  process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//             callbackURL: process.env.GOOGLE_CALLBACK_URL ||
//             "http://localhost:5000/api/auth/google/callback",
//         },
//         async (_, __, profile, done) => {
//             try {
//                 const email = profile.emails?.[0].value;


//                 let user = await User.findOne({ email });
//                 if (!user) {
//                     user = await User.create({
//                         name: profile.displayName,
//                         email,
//                         provider: "google",
//                         picture: profile.photos?.[0].value,
//                     });
//                 }


//                 return done(null, user);
//             } catch (err) {
//                 return done(err, null);
//             }
//         }
//     )
// );


// export default passport;
// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// import { User } from "../models/user-model";
// import "dotenv/config";

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//             callbackURL:
//                 process.env.GOOGLE_CALLBACK_URL ||
//                 "http://localhost:5000/api/auth/google/callback",
//         },
//         async (accessToken, refreshToken, profile: Profile, done) => {
//             try {
//                 console.log("iam log from try passport");
                
//                 let user = await User.findOne({ googleId: profile.id });

//                 if (!user) {
//                     user = await User.create({
//                         googleId: profile.id,
//                         name: profile.displayName,
//                         email: profile.emails?.[0].value,
//                         avatar: profile.photos?.[0].value,
//                         isVerified: true,
//                     });
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 console.log("catch from passport ahoooo");
                
//                 return done(error, undefined);
//             }
//         }
//     )
// );

// // passport.serializeUser((user: any, done) => {
// //     done(null, user.id);
// // });

// // passport.deserializeUser(async (id: string, done) => {
// //     try {
// //         const user = await User.findById(id);
// //         done(null, user);
// //     } catch (err) {
// //         done(err, null);
// //     }
// // });

// export default passport;

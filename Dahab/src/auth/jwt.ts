import passport from "../config/passport-jwt";
const jwtAuth = passport.authenticate("jwt", { session: false });
export default jwtAuth;
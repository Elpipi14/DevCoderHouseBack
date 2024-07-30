import passport from "passport";
import jwt from "passport-jwt";
import configObject from '../config/config.js';
import { UserModel } from "../mongoDb/schema/user.model.js";

const { private_key } = configObject;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderHouseToken"];
  }
  return token;
}

const initializePassport = () => {
  const jwtExtractor = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: private_key,
  };

  passport.use("jwt", new JWTStrategy(jwtExtractor, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.user._id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  passport.use("jwt-admin", new JWTStrategy(jwtExtractor, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.user._id);
      if (!user) {
        return done(null, false);
      }
      if (user.role === 'admin' || user.role === 'premium') {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));
};

export default initializePassport;

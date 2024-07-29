import passport from "passport";
import jwt from "passport-jwt";
import GitHubStrategy from "passport-github2";
import configObject from '../config/config.js';
const { private_key, client_id_git, client_secret_git } = configObject;
import { UserModel } from "../mongoDb/schema/user.model.js";

const JWT_SECRET = private_key;
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
    secretOrKey: JWT_SECRET,
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

  passport.use("github", new GitHubStrategy({
    clientID: client_id_git,
    clientSecret: client_secret_git,
    callbackURL: "http://localhost:8080/github",
    scope: ['user', 'users:email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('GitHub Profile:', profile);

      const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
      if (!email) {
        return done(new Error("No email found"), false);
      }

      let user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({
          first_name: profile._json.name,
          email,
          password: " ",
          image: profile._json.avatar_url,
          isGithub: true,
        });
      }

      console.log("User data:", user);

      return done(null, user);
    } catch (error) {
      console.error("Error in GitHub strategy:", error);
      return done(error, false);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default initializePassport;



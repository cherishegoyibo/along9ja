import { User, Route, Admin } from "../db_model/database.js";
import jwt from "jsonwebtoken";
import passport from "passport";
const secret = "along9ja";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js"; // Adjust the path to your User model

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username." });
      if (user.password !== password)
        return done(null, false, { message: "Incorrect password." });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

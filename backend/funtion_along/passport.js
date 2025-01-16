import { User, Route } from '../db_model/database.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new GoogleStrategy(
    {
      clientID:'1080137272257-a4pmnin4ckgt09pf52b7ijlucn2lchh5.apps.googleusercontent.com' ,
      clientSecret: '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', 
      callbackURL: "http://localhost:5480/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
      }
      return done(null, user); 
    }
  )
);


passport.use(
  new LocalStrategy(
    { 
      usernameField: 'email',  
      passwordField: 'password', 
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'No user with that email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); 
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); 
  done(null, user);
})
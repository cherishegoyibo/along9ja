import { User, Route, Admin } from '../db_model/database.js';
import passport from 'passport';
import bcrypt from 'bcrypt'
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


passport.use('user-local',
  new LocalStrategy(
    { 
      usernameField: 'email',   
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

passport.use('admin-local',
  new LocalStrategy(
    { 
      usernameField: 'email',  
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return done(null, false, { message: 'No admin with that email' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    }
  )
);



passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role || 'user' }); 
});

passport.deserializeUser(async (data, done) => {
  try {
    const Model = data.role === 'admin' ? Admin : User;
    const user = await Model.findById(data.id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

import express from 'express';
import passport from 'passport';

import { createUser, loginUser } from '../funtion_along/along.js';


const router = express.Router();

router.post('/createUser', createUser);


router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/fallback" }),
    (req, res) => {
      res.json({message: 'Authentication successful!',
        user: req.user});
        
    }
  );

  // router.get('/protectedRoute', verifyToken, (req, res) => {
  //   res.status(200).json({ message: 'This is a protected route', user: req.user });
  // });

router.get("/Homepage", (req, res) => {
    res.json({ message: "motherfucker" });
  });

router.get("/loginUser", loginUser)


export default router;

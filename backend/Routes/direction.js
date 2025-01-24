// include file
import userRequest from '../funcs/userRequest.js'
import { getDirections } from '../funcs/mapDirectionRequest.js';
import express from 'express';
import { createUser, createAdmin, loginadmin, loginuser,isAdmin,isUser} from '../funtion_along/along.js';
import passport from 'passport';


const router = express.Router();


router.route("/loginuser").get((req, res)=>{
    try{
        res.json({message:"log in ur username nd password"})
    } catch(err) {
        res.status(401).json({message: "pls input the right credential"})
    }
}).post(loginuser);
    

router.post("/loginadmin", loginadmin);

router.get("/", (req, res) => {
    try {
        res.json({ message: 'Welcome to along9ja' });
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }
});

router.get('/admin', isAdmin,(res,req) => {
    res.json({message: 'welcome'});
})

// All the routes in this file will be prefixed with /direction
router.route('/directions' )
    .get(isUser, (req, res) => {
    try {
        res.send(`GET request to the direction page`);
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }})

    .post(isUser,async (req, res) => {
        // need protection for this route, signin required
        const { userLocation, destination } = req.body; 
        if (!userLocation || !destination) {
            res.status(400).send('Please provide a user location and destination');
        }

        try {
            const directionsDetail = await userRequest(userLocation, destination);
            res.send(directionsDetail);
        } 
        catch(err) {
            res.status(500).send('Error, try again.');
        }
    });--

// router.route('/new')
//     .get((req, res) => {
//         res.send(`GET request to the new direction page`);
//     })
//     .post((req, res) => {
//         const requestData = JSON.stringify(req.body);-
//     });

router.route('/update')
    // sign in required
    .post((req, res) => {
        const mapout = getDirections(req.body.from, req.body.to);
        res.send(mapout);
    });

router.post('/createUser', createUser);

router.post('/createAdmin', createAdmin);
    
    
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
    
    router.get(
        "/google/callback",
        passport.authenticate("google", { failureRedirect: "/auth/fallback" }),
        (req, res) => {
          res.json({message: 'Authentication successful!',
            user: req.user});
            
        }
      );


export default router;
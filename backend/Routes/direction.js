// include file
import userRequest from '../funcs/userRequest.js'
import { getDirections } from '../funcs/mapDirectionRequest.js';
import express from 'express';
import { createUser, createAdmin, loginadmin, loginuser,isAdmin,isUser,isAuthenticated, logoutuser} from '../funtion_along/along.js';
import passport from 'passport';
import { addRoute } from '../funcs/adddRoutes.js';
import adminRouter from './admin.js';
import Admin from '../funcs/admin.js';
const admin = new Admin();


const router = express.Router();


router.route("/loginuser").get((req, res)=>{
    try{
        res.json({message:"log in ur username nd password"})
    } catch(err) {
        res.status(401).json({message: "pls input the right credential"})
    }
}).post(loginuser, isUser);


router.post('/logout' ,logoutuser); 

router.get('/session', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ isLoggedIn: true, user: req.user });
    } else {
      res.json({ isLoggedIn: false });
    }
  });
  

router.post("/loginadmin", loginadmin);

router.get("/", (req, res) => {
    try {
        res.json({ message: 'Welcome to along9ja' });
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }
});

router.get('/admin', isAdmin,(res,req) => {
    res.json({message: 'welcome to Admin page'});
})

router.route('/admin/new/route')
    .get(isAdmin, (req, res) => {
        res.send(`GET request to the new route page`);
    })
    .post(isAdmin, (req, res) => {
        const { origin, destination, waypoints } = req.body;
        if (!origin || !destination || !waypoints) {
            res.status(400).send('Please provide an origin, destination and waypoints');
        }
        try {
            const route = addRoute(origin, destination, waypoints);
            res.send(route);
        } catch (err) {
            res.status(500).send('Error, try again.');
        }
    });

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
    });

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
        const {from, to} = req.body;
        const mapout = getDirections(from, to);
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


//admin more functionality

router.route('/admin/users')
    .get(isAdmin, (req, res) => {
        try {
            res.send(admin.getAllUsers());
        } catch (err) {
            res.status(401).json({ message: 'You are not authorized to view this page' });
        }
    });

router.route('/admin/routes')
.get(isAdmin, (req, res) => {
    try {
        res.send(admin.getAllRoutes());
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }
});

router.route('/admin/admins')
.get(isAdmin, (req, res) => {
    try {
        res.send(admin.getAllAdmins());
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }
});

// All the routes in this file will be prefixed with /direction
router.route('/admin/user/:id' )
    .get(isAdmin, (req, res) => {
        try {
            res.send(admin.getUser(req.params.id));
        } catch (err) {
            res.status(401).json({ message: 'You are not authorized to view this page' });
        }})

    .post(isUser,async (req, res) => {
        const { id, data } = req.body;
        if (!id || !data) {
            res.status(400).send('Please provide a user id and data');
        }

        try {
            const user = await admin.UpdateUser(id, data);
            res.send(user);
        } 
        catch(err) {
            res.status(500).send('Error, try again.');
        }
    });

router.route('/admin/route/:id' )
.get(isAdmin, (req, res) => {
    try {
        res.send(admin.getUser(req.params.id));
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }})

.post(isUser,async (req, res) => {
    const { id, data } = req.body;
    if (!id || !data) {
        res.status(400).send('Please provide a user id and data');
    }

    try {
        const user = await admin.UpdateRoute(id, data);
        res.send(user);
    } 
    catch(err) {
        res.status(500).send('Error, try again.');
    }
});


export default router;
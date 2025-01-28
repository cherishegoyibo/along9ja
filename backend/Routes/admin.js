import { Router } from 'express';
import { isAdmin, isUser } from '../funtion_along/along.js';
import Admin from '../funcs/admin.js';
const router = Router();
const admin = new Admin();

//admin sign in required

router.route('/users')
    .get(isAdmin, (req, res) => {
        try {
            res.send(admin.getAllUsers());
        } catch (err) {
            res.status(401).json({ message: 'You are not authorized to view this page' });
        }
    });

router.route('/routes')
.get(isAdmin, (req, res) => {
    try {
        res.send(admin.getAllRoutes());
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }
});

router.route('/admins')
.get(isAdmin, (req, res) => {
    try {
        res.send(admin.getAllAdmins());
    } catch (err) {
        res.status(401).json({ message: 'You are not authorized to view this page' });
    }
});

// All the routes in this file will be prefixed with /direction
router.route('/user/:id' )
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

router.route('/route/:id' )
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

export default Router;

// add to direction.js
// import adminRouter from './admin.js';
// router.use('/admin', adminRouter);
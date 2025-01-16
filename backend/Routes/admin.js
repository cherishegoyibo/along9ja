import { Router } from 'express';
import { DataCounter } from '../funcs/dbCounter.js';
import { addRoute } from '../funcs/dbRouteNew.js';

const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

// admin sign in required

router.get('/', isAdmin, (req, res) => {
    users = DataCounter(User);
    routes = DataCounter(Route);
    res.send(`users:${users}, routes:${routes}`);
    });

router.route('/login')
    .post(async (req, res) => {
        const { username, password } = req.body;
        try {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(400).json({ message: 'Admin not found' });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
        res.send(`POST request to the login admin page`);
    });

router.route('/new', isAdmin)
    .get((req, res) => {
        res.send(`GET request to the add new, route page`);
    })
    .post((req, res) => {
        const requestData = JSON.stringify(req.body);
        try {
            addRoute(requestData);
            res.status(200).send('Route added successfully');
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }

    });

router.route('/update', isAdmin)
    .post((req, res) => {
        res.send(`POST request to the update admin page`);
    });



export default router;
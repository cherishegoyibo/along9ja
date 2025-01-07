import express from 'express';

import { createUser } from '../funtion_along/along.js';


const router = express.Router();

router.post('/createUser', createUser);



export default router;

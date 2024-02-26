import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { dashboard } from '../controllers/adminControllers.js';
import { registerController } from '../controllers/authControllers.js';
const router = express.Router()


//APPLY JOB || POST 
router.get('/dashboard', userAuth, dashboard);


//CREATE ADMIN || POST 
router.post('/register', userAuth, registerController);


export default router;
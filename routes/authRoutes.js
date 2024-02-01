import express from 'express';
import { authGetController, emailGetController, loginPostController, registerController } from '../controllers/authControllers.js';

const router = express.Router()


//routes
router.get('/', authGetController);

//EMAIL || GET 
router.get('/:email', emailGetController);

//REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginPostController);

export default router;
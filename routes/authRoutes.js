import express from 'express';
import { authGetController, emailGetController, idGetController, loginPostController, registerController } from '../controllers/authControllers.js';
import { userAuth } from '../middlewares/authMiddleware.js';

const router = express.Router()


//routes
router.get('/', authGetController);

//GET WITH EMAIL || GET 
router.get('/details', userAuth, emailGetController);

//GET WITH ID || GET 
router.get('/id-details', userAuth, idGetController);

//REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginPostController);

export default router;
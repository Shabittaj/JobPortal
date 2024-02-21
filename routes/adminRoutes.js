import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { dashboard } from '../controllers/adminControllers.js';
const router = express.Router()


//APPLY JOB || POST 
router.get('/dashboard', userAuth, dashboard);


//AGET APPLIED JOB || GET 
// router.get('/applied-job/:jobId', userAuth, getAppliedData);


export default router;
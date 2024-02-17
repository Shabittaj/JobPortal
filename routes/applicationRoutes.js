import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { applyJobController, getAppliedData } from '../controllers/applicationControllers.js';
const router = express.Router()


//APPLY JOB || POST 
router.post('/apply-job', userAuth, applyJobController);


//AGET APPLIED JOB || GET 
router.get('/applied-job/:jobId', userAuth, getAppliedData);


export default router;
import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { createJobSeekerDetails } from '../controllers/jobSeekerControllers.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();


// DETAILS || POST
router.post('/jobSeeker-details', upload.single('resume'), userAuth, createJobSeekerDetails);

// GET DETAILS || GET
router.post('/get-jobSeeker-details', userAuth,);

export default router;
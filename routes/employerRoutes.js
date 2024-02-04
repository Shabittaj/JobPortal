import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { createEmployerDetails } from '../controllers/employerControllers.js';

const router = express.Router();


// DETAILS || POST
router.post('/employer-details', userAuth, createEmployerDetails);

export default router;
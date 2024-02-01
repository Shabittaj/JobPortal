import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobController, updateJobController } from '../controllers/jobControllers.js';

const router = express.Router()

//routes

//CREATE JOB || POST
router.post('/create-job', userAuth, createJobController);

//VIEW JOB || GET
router.get('/get-job', userAuth, getAllJobController);

//UPDATE JOB || PATCH
router.patch('/update-job/:id', userAuth, updateJobController);

//DELETE JOB || DELTE
router.delete("/delete-job/:id", userAuth, deleteJobController);
export default router;
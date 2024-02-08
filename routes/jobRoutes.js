import express from 'express';
import { userAuth } from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobCreatedByEmployerController, updateJobController, viewAllJobsController } from '../controllers/jobControllers.js';
import { applyJobController } from '../controllers/applicationControllers.js';

const router = express.Router()

//routes

//CREATE JOB || POST
router.post('/create-job', userAuth, createJobController);

//VIEW JOB FOR EMPLOYER TO SEE THEIR CREATED JOBS ONLY || GET
router.get('/get-job', userAuth, getAllJobCreatedByEmployerController);

//VIEW ALL JOBS FOR JOBSEEKER || GET
router.get('/view-all-jobs', /*userAuth,*/ viewAllJobsController);

//UPDATE JOB || PATCH
router.patch('/update-job/:id', userAuth, updateJobController);

//DELETE JOB || DELTE
router.delete("/delete-job/:id", userAuth, deleteJobController);

// //APPLY JOB || POST
// router.post('/application', userAuth, applyJobController);

export default router;
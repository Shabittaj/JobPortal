import applicationModel from '../models/applicationModel.js';
import jobSeekerModel from '../models/jobSeekerModel.js';
import jobModel from '../models/jobModel.js';

export const applyJobController = async (req, res, next) => {
    try {
        // const { jobId } = req.query;
        const { jobId } = req.body;
        const jobSeekerId = req.user.userId;
        const jobseekerRole = req.user.role;
        if (jobseekerRole === 'jobSeeker') {
            const jobSeeker = await jobSeekerModel.findOne({ userId: jobSeekerId });
            if (!jobSeeker) {
                next('jobSeeker not found');
            }

            const job = await jobModel.findById(jobId);
            if (!job) {
                next('job not found');
            }

            // Check if the job seeker has already applied to this job
            const existingApplication = await applicationModel.findOne({
                jobId: jobId,
                jobSeekerId: jobSeekerId
            });
            if (existingApplication) {
                return next('You have already applied to this job');
            }

            // Create a new application
            const applicationData = new applicationModel({
                jobId: jobId,
                jobSeekerId: jobSeekerId,
                status: 'applied', // Set initial status to 'applied'
                applicationDate: Date.now()
            });

            const application = await applicationData.save();

            res.status(201).json({ status: 'success', application });
        } else {
            next('you are not authorized to apply for job!');
        }
    } catch (error) {
        next(error);
    }

}


export const getAppliedData = async (req, res, next) => {
    try {
        // const { jobId } = req.query;
        const { jobId } = req.body;
        const employerId = req.user.userId;
        const applications = await applicationModel.find({ jobId })
        if (!applications) {
            return next('no application found');
        }
        if (req.user.role === 'employer') {
            const jobs = await jobModel.findById(jobId);
            if (!jobs) {
                return next('no jobs found');
            }
            const jobSeekerData = await jobSeekerModel.findOne(applications.jobSeekerId)
                .select('resume')
                .populate('userId', 'firstName lastName email -password');
            const details = {
                jobSeekerData, jobs
            }

            // res.json({ status: true, details });
            // const applications = await applicationModel.find()
            //     .populate('jobSeekerId', 'resume')
            //     .populate('jobId', 'title description jobLocation') // Populate job details directly
            //     .select('status applicationDate'); // Select only necessary fields from the application

            res.json({ status: true, details });
        } else {
            next('you are not authorized to access this details');
        }
    } catch (error) {
        next(error);
    }
}
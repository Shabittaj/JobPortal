import fs from 'fs'; // Import the Node.js 'fs' module
import applicationModel from '../models/applicationModel.js';
import jobSeekerModel from '../models/jobSeekerModel.js';
import jobModel from '../models/jobModel.js';
import path from 'path';


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

// export const getAppliedData = async (req, res, next) => {
//     try {
//         // const { jobId } = req.query;
//         const { jobId } = req.body;
//         const employerId = req.user.userId;
//         const applications = await applicationModel.find({ jobId });
//         console.log(applications);
//         if (!applications || applications.length === 0) {
//             return next('No applications found');
//         }
//         if (req.user.role === 'employer') {
//             const jobs = await jobModel.findById(jobId);
//             if (!jobs) {
//                 return next('No jobs found');
//             }
//             let details = [];
//             for (let application of applications) {
//                 console.log(application.jobSeekerId);
//                 const jobSeekerData = await jobSeekerModel.findById("65c37435f14260afe8b87d3c")
//                     .select('resume userId') // Include userId in the selection
//                     .populate('userId', 'firstName lastName email -password'); // Populate userId from the User model

//                 console.log('jobSeekerData:', jobSeekerData); // Add this logging
//                 if (!jobSeekerData) {
//                     // If jobSeekerData is null, continue to the next application
//                     continue;
//                 }
//                 const applicationDetails = {
//                     jobSeekerData,
//                     job: {
//                         jobId: jobId,
//                         title: jobs.title
//                     }
//                 };
//                 details.push(applicationDetails);
//             }
//             res.json({ status: true, details });
//         } else {
//             next('You are not authorized to access this details');
//         }
//     } catch (error) {
//         next(error);
//     }
// };

``
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
            let details = []
            for (let application in applications) {
                const jobSeekerData = await jobSeekerModel.find(application.jobSeekerId)
                    .select('resume')
                    .populate('userId', 'firstName lastName email -password');
                details = {
                    jobSeekerData, jobs: {
                        jobId: jobId,
                        title: jobs.title
                    }
                }

                // res.json({ status: true, details });
                // const applications = await applicationModel.find()
                //     .populate('jobSeekerId', 'resume')
                //     .populate('jobId', 'title description jobLocation') // Populate job details directly
                //     .select('status applicationDate'); // Select only necessary fields from the application

            }
            res.json({ status: true, details });
        } else {
            next('you are not authorized to access this details');
        }
    } catch (error) {
        next(error);
    }
}




// export const getAppliedData = async (req, res, next) => {
//     try {
//         const { jobId } = req.body;
//         const employerId = req.user.userId;
//         const applications = await applicationModel.find({ jobId });

//         if (!applications) {
//             return next('No applications found');
//         }

//         if (req.user.role === 'employer') {
//             const jobs = await jobModel.findById(jobId);
//             if (!jobs) {
//                 return next('No jobs found');
//             }

//             const jobSeekerData = await jobSeekerModel.findOne(applications.jobSeekerId)
//                 .select('resume')
//                 .populate('userId', 'firstName lastName email -password');

//             if (!jobSeekerData) {
//                 return next('No job seeker data found');
//             }

//             // Extract resume details
//             const resume = jobSeekerData.resume.filename;

//             // Check if resume exists
//             if (!resume) {
//                 return next('Resume not found');
//             }

//             // // Get file path of resume
//             // const filePath = `../uploads/${resume.filename}`;

//             const filePath = path.join(__dirname, 'uploads/', resume);

//             // Check if file exists
//             if (!fs.existsSync(filePath)) {
//                 return next('Resume file not found');
//             }

//             // Read file
//             const fileData = fs.readFileSync(filePath);

//             // Set response headers
//             res.setHeader('Content-Type', resume.contentType);
//             res.setHeader('Content-Disposition', `attachment; filename=${resume.filename}`);

//             // Send job seeker data and resume file as response
//             res.json({
//                 status: true,
//                 jobSeekerData: {
//                     userId: jobSeekerData.userId,
//                     firstName: jobSeekerData.userId.firstName,
//                     lastName: jobSeekerData.userId.lastName,
//                     email: jobSeekerData.userId.email
//                 },
//                 resume: fileData
//             });
//         } else {
//             next('You are not authorized to access this details');
//         }
//     } catch (error) {
//         next(error);
//     }
// }

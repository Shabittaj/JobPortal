import jobModel from '../models/jobModel.js';
import jobSeekerModel from '../models/jobSeekerModel.js';
import employerModel from '../models/employerModel.js';
import applicationModel from '../models/applicationModel.js';

export const dashboard = async (req, res, next) => {
    try {
        const totalJobs = await jobModel.countDocuments();
        const totalEmployers = await employerModel.countDocuments();
        const totalJobSeekers = await jobSeekerModel.countDocuments();
        const totalApplications = await applicationModel.countDocuments();
        res.status(200).json({ totalJobs, totalEmployers, totalJobSeekers, totalApplications });
    } catch (error) {
        next(error)
    }
}


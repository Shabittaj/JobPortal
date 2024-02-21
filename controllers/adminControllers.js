import jobModel from '../models/jobModel.js';
import jobSeekerModel from '../models/jobSeekerModel.js';
import employerModel from '../models/employerModel.js';
import applicationModel from '../models/applicationModel.js';
import userModel from '../models/userModel.js';

export const dashboard = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const totalAdmins = await userModel.find({ role: 'admin' }).countDocuments();
            const totalJobs = await jobModel.countDocuments();
            const totalEmployers = await employerModel.countDocuments();
            const totalJobSeekers = await jobSeekerModel.countDocuments();
            const totalApplications = await applicationModel.countDocuments();
            res.status(200).json({ totalAdmins, totalJobs, totalEmployers, totalJobSeekers, totalApplications });
        } else {
            next('only admin have the access to this route');
        }
    } catch (error) {
        next(error)
    }
}


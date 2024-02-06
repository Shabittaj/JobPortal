import jobModel from "../models/jobModel.js";

// ******CREATE JOB*******
export const createJobController = async (req, res, next) => {
    try {
        const role = req.user.role;
        if (role === 'employer') {
            const { title, jobLocation } = req.body;
            if (!title || !jobLocation) {
                return next('please provide all the require field');
            }
            req.body.createdBy = req.user.userId;
            const job = await jobModel.create(req.body);
            res.status(201).json({ job });

        } else {
            return next('You are not authorized to create a Job!');
        }
    } catch (error) {
        return next(error);
    }
}

// ******GET JOB*******
export const getAllJobController = async (req, res, next) => {
    try {
        const jobs = await jobModel.find({ createdBy: req.user.userId });
        res.status(200).json({
            status: true,
            totalLength: jobs.length,
            jobs
        });
    } catch (error) {
        return next(error);
    }

}

// ******UPDATE JOB*******
export const updateJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const job = await jobModel.findOne({ _id: id });
        if (!job) {
            return res.status(404).json({ error: `No Job with the id of ${id}` });
        }
        if (!(req.user.userId === job.createdBy.toString())) {
            return res.status(403).json({ error: 'You are not authorized to update this job' });
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (Object.prototype.hasOwnProperty.call(updates, key)) {
                job[key] = updates[key];
            }
        }

        const updateJob = await job.save();

        res.status(200).json({
            status: true,
            updateJob
        });

    } catch (error) {
        return next(error);
    }
}


// ******DELETE JOB*******
export const deleteJobController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobModel.findOne({ _id: id });
        if (!job) {
            return next(`No Job with the id of ${id}`);
        }
        if (!(req.user.userId === job.createdBy.toString())) {
            return next('you are not authorized to update this job')
        }
        await job.deleteOne();
        res.status(200).json({
            status: true,
            message: "Job Deleted successfully"
        })
    } catch (error) {
        next(error);
    }

}
import JobSeekerModel from '../models/jobSeekerModel.js';


export const createJobSeekerDetails = async (req, res, next) => {
    if (req.user.role === 'jobSeeker') {
        try {
            // Assuming you have other form fields in the request body
            const {
                userId,
                education,
                yearOfExperience,
                portfolio,
                jobPreferences,
                workHistory,
                projects,
                certifications,
                skills,
                additionalInformation
            } = req.body;

            // Create a new job seeker object
            const newJobSeeker = new JobSeekerModel({
                userId: req.user.userId,
                education,
                yearOfExperience,
                portfolio,
                jobPreferences,
                workHistory,
                projects,
                certifications,
                skills,
                additionalInformation
            });

            // Handle the uploaded resume file
            if (req.file) {
                // Assuming you have a field in your schema to store the resume
                newJobSeeker.resume = {
                    data: req.file.buffer, // Update this line to read from the file on disk
                    contentType: req.file.mimetype,
                    filename: req.file.originalname
                };
            }

            // Save the job seeker to the database
            await newJobSeeker.save();

            res.status(201).json({ message: 'Job seeker added successfully', newJobSeeker });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error });
        }
    } else {
        res.status(403).json({ message: "You are not authorized to perform this action" });
    }
}


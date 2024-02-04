import employerModel from "../models/employerModel.js";

export const createEmployerDetails = async (req, res, next) => {
    try {
        if (req.user.role === 'employer') {
            // Create a new Employer instance with data from the request body
            const newEmployer = new employerModel({
                userId: req.user.userId,
                companyName: req.body.companyName,
                companyDescription: req.body.companyDescription,
                numberOfEmployees: req.body.numberOfEmployees,
                companyWebsite: req.body.companyWebsite || 'none',
                industry: req.body.industry,
                address: {
                    street: req.body.address?.street,
                    city: req.body.address?.city,
                    state: req.body.address?.state,
                    postalCode: req.body.address?.postalCode,
                    country: req.body.address?.country,
                },
                contactInfo: req.body.contactInfo,
            });

            const savedEmployer = await newEmployer.save();
            // const savedEmployer = await employerModel.create(req.body);

            // Send a success response with the saved employer data
            res.status(201).json(savedEmployer);
        } else {
            next('You are not authorized');
        }
    } catch (error) {
        next(error);
    }
}
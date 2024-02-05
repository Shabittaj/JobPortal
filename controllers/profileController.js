import userModel from "../models/userModel.js";
import employerModel from "../models/employerModel.js";
import jobSeekerModel from "../models/jobSeekerModel.js";


//DISPLAY PROFILE OF USER AND THEIR ROLE THROUGH ID
export const idGetController = async (req, res, next) => {
    try {
        const id = req.user.userId;
        const data = await userModel.findById({ _id: id });
        if (!data) {
            return res.status(401).json({ status: false, error: "User not found!" });
        }
        let details;
        const employerData = await employerModel.findOne({ userId: data._id });
        const jobSeekerData = await jobSeekerModel.findOne({ userId: data._id });
        if (employerData) {
            details = employerData;
        } else {
            details = jobSeekerData;
        }
        res.status(200).json({
            status: true,
            message: "Email found",
            data: data, details
        })


    } catch (error) {
        return res.status(400).json({
            message: 'Error in ID Get Controller',
            status: false,
            error: error
        })
    }
}

//DISPLAY PROFILE OF USER AND THEIR ROLE THROUGH EMAIL 
export const emailGetController = async (req, res) => {
    try {
        const email = req.user.email;
        const data = await userModel.findOne({ email: email });
        if (!data) {
            return res.status(401).json({ status: false, error: "User not found!" });
        } else {

            const extraData = await employerModel.findOne({ userId: data._id }) || await jobSeekerModel.findOne({ userId: data._id });
            res.status(200).json({
                status: true,
                message: "Email found",
                data: data, extraData
            })
        }

    } catch (error) {
        return res.status(400).json({
            message: 'Error in Email Get Controller',
            status: false,
            error: error
        })
    }

}

//UPDATE USER PROFILE 
export const updateUserController = async (req, res, next) => {
    const { firstName, lastName, email, location } = req.body;
    if (!firstName || !lastName || !email || !location) {
        return next('please provide all the field');
    }
    try {
        // const user = await userModel.findOne({ email });
        // console.log(req.user._id);
        const userId = req.user.userId;
        const user = await userModel.findById({ _id: userId });
        if (!user) {
            return next('User Not Found');
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.location = location;

        await user.save();

        const token = user.createJWT();
        res.status(201).json({
            status: true,
            message: 'User Updated Successfully',
            user,
            token

        })
    } catch (error) {
        next(error);
    }
}

//UPDATE DETAILS OF EMPLOYER/JOBSEEKER BASED ON USER ID
export const updateDetailsControllers = async (req, res, next) => {

}
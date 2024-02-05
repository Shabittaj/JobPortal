import employerModel from "../models/employerModel.js";
import jobSeekerModel from "../models/jobSeekerModel.js";
import userModel from "../models/userModel.js";

//GET ALL THE DETAILS 
export const authGetController = async (req, res) => {
    const user = await userModel.find();
    res.status(200).json({ details: user });
}

//DISPLAY PROFILE OF USER AND THEIR ROLE THROUGH EMAIL 
export const emailGetController = async (req, res) => {
    try {
        const data = await userModel.findOne({ email: req.params.email });
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

export const registerController = async (req, res, next) => {
    try {
        const details = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
        })

        // const user = await details.save()
        const user = await userModel.create(req.body);

        //token
        const token = user.createJWT();

        res.status(201).json({
            message: 'User registered successfully',
            status: true,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                location: user.location,
                phoneNumber: user.phoneNumber,
                role: user.role

            },
            token: token
        })

    } catch (error) {
        next(error);
    }
}

export const loginPostController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            next('Please Provide require fields');
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            next('Invalid email or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next('Invalid email or password');
        }

        user.password = undefined;
        const token = user.createJWT();
        res.status(201).json({
            message: 'User login successfully',
            status: true,
            user,
            token: token
        })

    } catch (error) {
        next(error);
    }
}
import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { firstName, lastName, email, location } = req.body;
    if (!firstName || !lastName || !email || !location) {
        return next('please provide all the field');
    }
    try {
        // const user = await userModel.findOne({ email });
        // console.log(req.user._id);
        const user = await userModel.findById({ _id: req.user.userId });
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
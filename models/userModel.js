import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName is require"]
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is require'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'password is require'],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is require'],
        maxlength: [10, "phone number length should be 10 digit"],
        validate: validator.isMobilePhone
    },
    address: {
        type: String
        // street: {
        //     type: String
        // },
        // city: {
        //     type: String
        // },
        // state: {
        //     type: String
        // },
        // postalCode: {
        //     type: String
        // },
        // country: {
        //     type: String
        // }
    },
    role: {
        type: String,
        enum: ['jobSeeker', 'employer' /*, 'admin'*/],
        required: [true, 'Role is required']
    }
}
    , {
        timestamps: true
    });

//Hashing password 
userSchema.pre('save', async function () {
    try {
        if (!this.isModified) return;
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (error) {
        next(error);
    }
})

//Creating JWT
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id, firstName: this.firstName, email: this.email, role: this.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

userSchema.methods.comparePassword = function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
}

export default mongoose.model('User', userSchema);
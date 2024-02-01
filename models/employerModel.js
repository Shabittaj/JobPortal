import mongoose from 'mongoose'

const employerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String
    },
    numberOfEmployees: {
        type: Number
    },
    companyWebsite: {
        type: String,
        default: "none"
    },
    industry: {
        type: String
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        postalCode: {
            type: String
        },
        country: {
            type: String
        }
    },
    contactInfo: {
        type: String
    },
}, {
    timestamps: true
})

export default mongoose.model('Employer', employerSchema)
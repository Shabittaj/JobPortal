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
    companyWebsite: {
        type: String
    },
    industry: {
        type: String
    },
}, {
    timestamps: true
})

export default mongoose.model('Employer', employerSchema)
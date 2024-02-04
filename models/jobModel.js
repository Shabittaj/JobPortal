import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is require'],
        maxlength: 100
    },
    description: {
        type: String
    },
    preferredEducation: [{
        type: String
    }],
    preferredSkill: [{
        type: String
    }],
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        default: 'India',
        required: [true, 'Job Location is require']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    // category: {
    //     type: String,
    //     enum: ['IT', 'HR', 'Education', 'BPO', 'others']
    // },
    // salary: {
    //     min: {
    //         type: Number,
    //         default: 0
    //     },
    //     max: {
    //         type: Number,
    //         default: 0
    //     }
    // }

}, { timestamps: true });


export default mongoose.model('Job', jobSchema);      
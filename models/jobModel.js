import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company is require']
    },
    position: {
        type: String,
        required: [true, 'Job Position is require'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    // category: {
    //     type: String,
    //     enum: ['IT', 'HR', 'Education', 'BPO', 'others']
    // },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: 'India',
        required: [true, 'Work Location is require']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    salary: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        }
    }

}, { timestamps: true });


export default mongoose.model('Job', jobSchema);      
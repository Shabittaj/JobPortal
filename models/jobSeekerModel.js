const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSeekerSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    education: {
        type: String
    },
    yearOfExperience: {
        type: String
    },
    resumeUrl: {
        type: String,
    },
    portfolio: {
        type: String,
    },
    jobPreferences: [{
        desiredJobTitle: {
            type: String
        },
        desiredLocation: {
            type: String
        },
        desiredSalary: {
            type: Number
        },
    }],
    workHistory: [{
        jobTitle: {
            type: String
        },
        company: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        responsibilities: {
            type: String
        },
    }],
    projects: [{
        projectName: {
            type: String
        },
        description: {
            type: String
        },
        technologiesUsed: [{
            type: String
        }],
        projectUrl: {
            type: String
        },
    }],
    certifications: [{
        certificationName: {
            type: String
        },
        issuingOrganization: {
            type: String
        },
        issuanceDate: {
            type: Date
        },
    }],
    skills: [{
        skillName: {
            type: String
        },
        proficiency: {
            type: String,
        },
    }],
    additionalInformation: {
        aboutMe: {
            type: String
        },
    },
}, { timestamps: true });

export default mongoose.model('JobSeeker', jobSeekerSchema);

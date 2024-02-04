const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSeekerSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    skills: [{
        type: String
    }],
    education: {
        type: String
    },
    experience: {
        type: String
    },
    contactInfo: {
        phone: {
            type: String
        }
        // linkedInProfile: {
        //     type: String
        // },
        // // Add more contact details as needed
    },
    resume: {
        type: String, // You can store the file path or a link to the resume
    },
    portfolio: {
        type: String, // Link to the job seeker's portfolio, if applicable
    },
    jobPreferences: {
        desiredJobTitle: {
            type: String
        },
        desiredLocation: {
            type: String
        },
        desiredSalary: {
            type: Number
        },
    },
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
        // Add more project details as needed
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
        // Add more certification details as needed
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


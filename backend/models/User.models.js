const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            minlength: 3,
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        profilePicture: {
            type: String,
            default: ""
        },
        technicalSkills: {
            type: [String],
            default: null
        },
        dateOfBirth: {
            type: Date,
            default: null
        },
        location: {
            type: String,
            default: ""
        },
        profession: {
            type: String,
            default: ""
        },
        college: {
            type: String,
            default: ""
        },
        facebook: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        github: {
           type: String,
            default: ""
        },
        x: {
           type: String,
            default: ""
        },
        date: {
            type: Date,
            default: Date.now
        },
        visibilityPublic: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', UserSchema);
module.exports = User;
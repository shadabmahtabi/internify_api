const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const employeeSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, 'First name is required.'],
            minLength: [4, 'First name should be at least 4 characters long.']
        },
        lastname: {
            type: String,
            required: [true, 'Last name is required.'],
            minLength: [4, 'Last name should be at least 4 characters long.']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required.'],
            minLength: [10, 'Contact should be at least 10 characters long.'],
            maxLength: [10, 'Contact should not exceed 10 characters.']
        },
        city: {
            type: String,
            required: [true, 'City is required.'],
            minLength: [3, 'City should be at least 10 characters long.'],
        },
        organizationName: {
            type: String,
            required: [true, 'Organization name is required.'],
            minLength: [4, 'Organization name should be at least 4 characters long.']
        },
        organizationLogo: {
            type: Object,
            default: {
                fileId: '',
                url: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required.'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            select: false,
            // match: [],
            maxLength: [15, 'Password should not exceed more than 15 characters.'],
            minLength: [6, 'Password should have at least 6 characters.']
        },
        resetPasswordToken: {
            type: String,
            default: '0'
        },
        internships: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship'
        }],
        jobs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }]
    },
    { timestamps: true }
)

employeeSchema.pre('save', function () {
    if (!this.isModified('password')) {
        return;
    }

    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

employeeSchema.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}   

employeeSchema.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const employee = mongoose.model('Employee', employeeSchema)

module.exports = employee
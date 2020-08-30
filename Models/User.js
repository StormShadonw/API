const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId: Number,
    name: String,
    lastName: String,
    sex: String,
    telephoneNumber: String,
    email: {
        type: String
    },
    password: {
        type: String
    },
    licenses: [{
        licenseId: Number,
        licenseKey: String,
        createdDate: Date,
        dateOfFirstUse: Date,
        dateOfLastUse: Date,
        codes: [{
            code: String,
            active: Boolean,
            createdDate: Date,
            dateOfFirstUse: Date,
            dateOfLastUse: Date
        }],
        startDate: Date,
        endDate: Date,
        createdBy: String
    }],
    apps: [{
        appId: Number,
        appShortName: String,
        appTitle: String,
        appDescription: String,
        licenseCode: String,
        createdDate: Date,
        modifiedDate: Date,
        CreatedBy: String,
        active: Boolean
    }],
    createdDate: Date,
    modifiedDate: Date,
    createdBy: String,
    active: Boolean,
    role: String
})

module.exports = mongoose.model("Users", userSchema);

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    // Username
    username: {
        type: String,
        required: [true, "Username is required"], // Custom required message
        unique: [true, "username is already taken"]
    },

    // Email
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Account already exists with this email address"]// Prevent duplicate emails
    },

    // Password
    password: {
        type: String,
        required: [true, "Password is required"],
    }

}, 
)

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
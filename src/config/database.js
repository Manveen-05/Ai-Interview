// Import mongoose
const mongoose = require("mongoose")

// Async function to connect to MongoDB
async function connectToDB() {
    try {
        // Attempt to connect using the URI stored in .env file
        await mongoose.connect(process.env.MONGO_URI)

        // If connection is successful
        console.log("Connected to Database")
    } catch (error) {
        // If any error occurs while connecting
        console.error("Database connection failed:", error.message)

        // Exit the process with failure code
        process.exit(1)
    }
}

// Export the function so it can be used in app.js
module.exports = connectToDB
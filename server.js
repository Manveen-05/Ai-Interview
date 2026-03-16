require("dotenv").config()
// Create express app
const app = require("./src/app")

// This file should export connectToDB using module.exports
const connectToDB = require("./src/config/database")

// Call the function to connect to MongoDB
connectToDB()

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000")
})
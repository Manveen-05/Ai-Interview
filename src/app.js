// Import the Express library
// require("express") loads the express package installed via npm
const express = require("express")

// Create an Express application instance
// This 'app' object will be used to configure server, routes, middleware, etc.
const app = express()

// Middleware: express.json()
// This allows your server to accept JSON data from requests
// Without this, req.body will be undefined
app.use(express.json())

/* require all the routes here */
const authRouter = require("./routes/auth.routes")

/* using all the routes here */
app.use("/api/auth",authRouter)

module.exports = app
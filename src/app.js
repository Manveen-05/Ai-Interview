// Import the Express library
// require("express") loads the express package installed via npm
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

// Create an Express application instance
// This 'app' object will be used to configure server, routes, middleware, etc.
const app = express()

// Middleware: express.json()
// This allows your server to accept JSON data from requests
// Without this, req.body will be undefined
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)

// Root route to prevent "Cannot GET /" error
app.get("/", (req, res) => {
    res.end();
})

module.exports = app
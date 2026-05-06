const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model.js');
const blacklistModel = require('../models/blacklist.model.js');

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized as token not provided" });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized, token is blacklisted" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user from database
        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user object to req
        req.user = user;
        
        // Very important: Proceed to the next function (controller)
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized as token is invalid" });
    }
}

module.exports = { authUser }
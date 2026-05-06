const usseModel = require('../models/user.model.js');
const blacklistModel = require('../models/blacklist.model.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
/**
 * @name registerusercontroller
 * @description registers new username , expect email , password
 * @access public
 */

async function registerusercontroller(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const isuseralreadyexist = await usseModel.findOne({
        $or: [{ username }, { email }]
    })
    if (isuseralreadyexist) {
        return res.status(400).json({ message: "User already exists" })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await usseModel.create({
        username,
        email,
        password: hash
    })
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)
    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })




}

/**
 * @name logincontroller
 * @description  logs in user
 * @access public
 */
async function logincontroller(req, res) {
    const { email, password } = req.body
    const user = await usseModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "invaild mail or passwoord" })
    }
    const ispasswordvalid = await bcrypt.compare(password, user.password)
    if (!ispasswordvalid) {
        return res.status(400).json({ message: "invaild mail or passwoord" })
    }
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })



}
/**
 * @name logoutusercontroller
 * @description logs out user by clearing cookie and blacklisting token
 * @access public
 */
async function logoutusercontroller(req, res) {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ message: "No token found" })
    }
    await blacklistModel.create({ token })
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully",
    })
}
async function getmecontroller(req, res) {
    const user = req.user
    return res.status(200).json({
        message: "User fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = { registerusercontroller, logincontroller, logoutusercontroller, getmecontroller }


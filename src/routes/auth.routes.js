//const express = require('express') or
const { Router } = require('express')
const authRouter = Router()
const authController = require('../controllers/auth.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @sccess public
 
 */
authRouter.post('/register', authController.registerusercontroller)
/**
 * @route POST /api/auth/login
 * @description login with email and password
 * @access public
 
 */


/**
 * @route GET /api/auth/logout
 * @description logout user by clearing cookie and blacklisting token
 * @access public
 */
authRouter.post('/login', authController.logincontroller)
authRouter.get('/logout', authController.logoutusercontroller)

/**
 * @route GET /api/auth/get-me
 * @description get current user
 * @access private
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getmecontroller)

module.exports = authRouter
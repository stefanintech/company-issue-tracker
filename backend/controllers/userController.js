const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc   register a new user
// @route  /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    // validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // find if user already exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

     // hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)

     // create user
     const user = await User.create({
        name,
        email,
        password: hashedPassword
     })

     if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
     } else {
        res.status(400)
        throw new error('Invalid user data')
     }

    res.send('Register Route')
})

// @desc   login a new user
// @route  /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser
}
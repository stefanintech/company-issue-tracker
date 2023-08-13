const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
            email: user.email,
            token: generateToken(user._id)
        })
     } else {
        res.status(400)
        throw new Error('Invalid user data')
     }
})

// @desc   login a new user
// @route  /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    
    // check user and password match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @desc   get current user
// @route  /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)

})

 // generate token
 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '14d'
    })
 }

module.exports = {
    registerUser,
    loginUser,
    getMe
}
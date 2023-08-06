// @desc   register a new user
// @route  /api/users
// @access public
const registerUser = (req, res) => {
    res.send('Register Route')
}

// @desc   login a new user
// @route  /api/users/login
// @access public
const loginUser = (req, res) => {
    res.send('Login Route')
}

module.exports = {
    registerUser,
    loginUser
}
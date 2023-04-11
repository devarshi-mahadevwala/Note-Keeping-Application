const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const JWT_SECRET = 'itsiNotebookforyou'
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/FetchUser');


// Route 1: create a user using: POST "/api/auth", does not require auth
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    body('userName').isLength({ min: 3 })
], async (req, res) => {
    let success = false;
    // iff there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        // to check if the user with the same email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            userName: req.body.userName,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken: authToken })
        // console.log(jwtData)
        // res.json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({success,failure:"Internal Server Error"});
    }

    // .then(user => res.json(user))
    //     .catch(err => {
    //         console.log(err)
    //         res.json({ error: "Enter a unique value for email", message: err.message })
    //     });
})

// Route 2: User Login: POST "api/notes/loginuser".
router.post('/loginuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Login with correct credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.send({ success,authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({success,failure:"Internal Server Error"});
    }
}
)

// Route 3: Get Logged in user details // Login required POST "api/auth/getuser"
router.post('/getuser',fetchUser , async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        let success = true;
        res.send(success,user)
    } catch (error) {
        console.log(error.message);
        let success = false;
        res.status(500).send({success,failure: "Internal Server Error"});
    }
}
)
module.exports = router
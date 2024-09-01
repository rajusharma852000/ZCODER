const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User.models.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchuser.middleware.js');


// ROUTE 1: Create user : Post '/api/auth/
router.post('/signup', [
    body('firstName', "First Name should be atleast 2 characters long").isLength({ min: 2 }),
    body('lastName', "Last Name should be atleast 2 characters long").isLength({ min: 2 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "atleast 5 charecter long").isLength({ min: 5 }),

], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).send({ success, error: errors.array });
    }

    try {
        //does this email already exist in data base
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ success, error: "Email already linked to some other account" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const seqPass = await bcrypt.hash(req.body.password, salt);

        //create user
        user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: seqPass,
            profilePicture: req.body.profilePicture,
            technicalSkills: req.body.techStack,
            dateOfBirth: req.body.dateOfBirth,
            location: req.body.location,
            profession: req.body.profession,
            college: req.body.college,
            facebook: req.body.facebook,
            linkedin: req.body.linkedin,
            instagram: req.body.instagram,
            github: req.body.github,
            x: req.body.x,
            visibilityPublic: req.body.visibilityPublic
        });

        //send authentication token
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.status(200).send({ success, authToken });

    }
    catch (error) {
        res.status(500).send({ success, error: error.message });
    }
});


//ROUTE 2: login : post /api/auth/login
router.post('/login', [
    body('email', "enter a valid email").isEmail(),
    body('password', "password cannot be empty").exists(),

], async (req, res) => {
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
        return res.status(400).send({ success, error: error.array });
    }

    try {
        //Allow if user has an account
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ success, error: "Invalid credentials" });
        }

        //Allow only if user own the account
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(400).send({ success, error: "Invalid credentails" });
        }

        //send authentication token
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.status(200).send({ success, authToken });
    }
    catch (error) {
        res.status(500).send({ success, error: error.message });
    }
});

//ROUTE 3: Get logged in user details : post /api/auth/getuser : Login require
router.get('/getuser', fetchuser, async (req, res) => {
    let success = false;
    const id = req.user.id;
    try {
        let user = await User.findById(id).select("-password");
        success = true;
        res.status(200).send({ success, user });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server Error", error: error.message });
    }

});


// ROUTE 4: Updating user's profile  : put 'api/note/user/' : Login required
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
router.put("/updateuser", fetchuser, async (req, res) => {
    let success = false;
    try {

        const { firstName, lastName, email, password, profilePicture, technicalSkills, dateOfBirth, location, profession, college, facebook, linkedin, instagram, github, x, visibilityPublic } = req.body;
        let user = {};
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = password;
        if (profilePicture) user.profilePicture = profilePicture;
        if (technicalSkills) user.technicalSkills = technicalSkills;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
        if (location) user.location = location;
        if (profession) user.profession = profession;
        if (college) user.college = college;
        if (facebook) user.facebook = facebook;
        if (linkedin) user.linkedin = linkedin;
        if (instagram) user.instagram = instagram;
        if (github) user.github = github;
        if (x) user.x = x;
        if (visibilityPublic) user.visibilityPublic = visibilityPublic;

        if (!validateEmail(user.email)) {
            return res.status(400).send({ success, error: "Invalid credentials" });
        }

        user = await User.findByIdAndUpdate(req.user.id, { $set: user }, { new: true }).select("-password");
        success = true;
        res.json({ success, user })
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
})


// ROUTE 5: Search others profiles
router.get("/bulk", async (req, res) => {
    const firstNameFilter = req.query.firstName || "";
    const lastNameFilter = req.query.lastName || "";

    const query = {
        $or: []
    };

    //if fist name is provided, find the matching results
    if (firstNameFilter) {
        query.$or.push({
            firstName: {
                "$regex": firstNameFilter,  //regex : regular expressions
                "$options": "i"  // Case-insensitive matching
            }
        })
    }

    //if last nams is provided, find he matching results
    if (lastNameFilter) {
        query.$or.push({
            lastName: {
                "$regex": lastNameFilter,  //regex : regular expressions
                "$options": "i"  // Case-insensitive matching
            }
        })
    }

    const results = await User.find(query);

    res.json({
        user: results.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id
        }))
    })
});

router.delete("/deleteAccount/:id", fetchuser, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting account", error: error.message });
    }
})



module.exports = router;
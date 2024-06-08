const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/UserSchema");
const { body, validationResult } = require('express-validator');

// const session = require("express-session");
dotenv.config();
const SECRETKEY = process.env.SECRETKEY

// Validation middleware
const validateRegister = [
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
        .trim().escape(),
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
const validateLogin = [
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
exports.register = (req, res) => {
    res.render("signup");
};
//user signup post controller function
exports.registersave = [
    validateRegister,
    async (req, res) => {
        const { username, email, password } = req.body;
        console.log(req.body)

        try {
            const userexist = await User.findOne({
                "email": email,
            })
            if (userexist) {
                return res.status(400).json({ message: "user already exist" })
            } else {
                const hashpassword = await bcrypt.hash(password, 10)
                const usercreated = new User({
                    username: username,
                    email: email,
                    password: hashpassword,
                });
                await usercreated.save()
                    .then((data) => {
                        console.log("user saved")
                    }).catch((err) => console.log(err))
                const token = jwt.sign({ email: usercreated.email, id: usercreated._id }, SECRETKEY)
                res.status(201).json({ message: "User successfuly Created", user: usercreated, token: token })
            }
        }
        catch (error) {
            res.status(400).json({ error: error })
            console.log(error);
        }

    }];
exports.getuserlogin = (req, res) => {
    res.render("Login");
}
//user signin post controller function
exports.postuserlogin = [
    validateLogin,
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const userexist = await User.findOne({
                "email": email,
            })
            if (userexist) {
                bcrypt.compare(password, userexist.password, (error, record) => {
                    console.log(error);
                    console.log(record);
                    if (record) {
                        console.log("inside record")
                        const token2 = jwt.sign({ email: userexist.email, id: userexist._id, username: userexist.username }, SECRETKEY)
                        res.status(201).json({ message: "User login successfully", token: token2 })
                    } else {
                        console.log("You have entered wrong password");
                    }
                })
            } else {
                console.log("User doesn't exist")
            }
        } catch (error) {
            console.log(error)

        }
    }
]


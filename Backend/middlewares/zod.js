const express = require("express")
const app = express();
const { z } = require("zod")
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const passwordSchema = z
    .string()
    .min(6, "Password must be atleast 6 charators")
    .max(256)
    .regex(/[A-Z]/, "Password must contain atlease 1 capital letter")
    .trim()
   

const userSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters ').optional(),
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
});
const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
});
const SignupValidation = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ error: err.issues.map((ele) => ele.message) })
        // return res.status(400).json({ error: "something is wrong in zod" })
    }
}

const SigninValidation = async (req, res, next) => {
    console.log(req.body);
    try {
        const parsebody = await signInSchema.parseAsync(req.body);
        console.log(parsebody)
        next();
    } catch (err) {
        return res.status(400).json({ error: err.issues.map((ele) => ele.message) })
    }
}

module.exports = { SignupValidation, SigninValidation }
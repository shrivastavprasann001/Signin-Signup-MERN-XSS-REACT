const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const SECRETKEY = process.env.SECRETKEY
const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log("token", token)
        if (token) {
            token = token.split(" ")[1];
            // console.log(token)
            let user = jwt.verify(token, SECRETKEY);
            console.log(user)
            req.userid = user.id;
            next();
        } else {
            return res.status(400).json({ status: 400, message: "Unauthorized user" })
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: "Unauthorized" })
    }
}
module.exports = { auth };
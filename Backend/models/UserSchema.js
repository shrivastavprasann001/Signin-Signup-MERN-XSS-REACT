const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/assignment");

mongoose.connection.on("connected", () => {
    console.log("Connected to the database!");
});
mongoose.connection.on("error", (err) => {
    console.log("Error connecting to the database:" + err);
});
const userSchema = new mongoose.Schema({

    username: { type: String, },
    email: { type: String, required: [true, "please enter the email"], unique: true, lowercase: true, },
    password: { type: String, required: [true,"please enter the password"], },
});
module.exports = mongoose.model('assignment', userSchema);

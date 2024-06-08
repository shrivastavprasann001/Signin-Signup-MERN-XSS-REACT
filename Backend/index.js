const express = require("express");
const dotenv = require("dotenv");
const path = require("path")
const mongoose = require("mongoose")
const userroute = require("./routes/UserRouter")
const bodyparser = require("body-parser");
const mongosanitize = require("express-mongo-sanitize");
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
dotenv.config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(helmet());
app.use(mongosanitize());
app.use(xss())
app.use(cors(corsOptions));
// app.use(express.json());
app.use(bodyparser.json());
app.use("/", userroute); // whenever we call /admin route it will redirect to userroute file
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })



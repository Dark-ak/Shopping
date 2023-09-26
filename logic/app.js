require('dotenv').config()
const express = require('express')
const mongoose = require("./src/config/db")
const User = require("./src/models/user")
const authRoute = require("./src/routes/auth")
const cartRoute = require("./src/routes/checkout")
const app = express()
const session = require('express-session')
const googleConfig = require("./src/utils/google_passport")
const passport = require("passport")
const cors = require("cors")
const port = 5000


app.use(express.json())

app.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(passport.initialize())
app.use(passport.session())



app.use("/auth", authRoute)
app.use("/checkout", cartRoute)


app.listen(port, () => console.log(`Server running on ${port}!`))
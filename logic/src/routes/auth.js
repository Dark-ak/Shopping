const express = require("express");
const router = express.Router()
const userController = require("../controllers/userController")
const passport = require("passport")

router.get("/signup", (req, res) => {
    res.send("Signing up")
})

router.post("/signup", userController.signup)


router.get("/login", (req, res) => {
    res.send("Log in")
})

router.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get("/login/success", userController.google)

router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: "/auth/login/success",
        failureRedirect: "http://localhost:3000/auth/login"
    })
);


router.post("/login", userController.login)


module.exports = router
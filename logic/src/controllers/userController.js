require('dotenv').config()
const Joi = require("joi")
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.KEY
const cookie = require('cookie')

const encryption = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

async function signup(req, res) {

    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email(),
            phone: Joi.number().min(10),
            password: Joi.string().min(6)
        })

        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingEmail = await User.findOne({ email: req.body.email });
        const existingPhone = await User.findOne({ phone: req.body.phone });

        if (existingEmail) {
            return res.status(409).json({ error: "User email already Exists" })
        }
        if (existingPhone) {
            return res.status(409).json({ error: "User number already exists" })
        }

        const hashedPassword = await encryption(req.body.password);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
        })

        const savedUser = await newUser.save();

        res.status(201).json(savedUser)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const pass = await bcrypt.compare(password, user.password)

        if (!pass) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ userId: user._id }, jwtSecretKey)
        const name = user.name
        const id = user._id

        const data = {
            token: token,
            id: id,
            name: name
        }
        res.json({ data })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function google(req, res) {
    try {
        const token = jwt.sign({ userId: req.user._id }, jwtSecretKey)
        res.cookie("authToken", token)
        res.cookie("userName", req.user.name)
        res.cookie("email", req.user.email)
        res.cookie("userId", req.user._id.toString())
        res.redirect("http://localhost:3000")
    } catch (err) {
        console.error(err)
    }
}



module.exports = { signup, login, google }   
const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.error("Error connecting the db: ", err))

module.exports = mongoose



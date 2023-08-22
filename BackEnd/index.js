require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const sequelize = require("./config/connection")
const app = express()

app.use(cors())

app.use(express.json())

app.get('/', async (req, res) => {
    // await sequelize.sync()
    await sequelize.sync()
    res.status(200).json({
        success: true,
        msg: 'Oplist api running successfully!'
    })
})

app.use('/', routes)

app.listen(5000, () => {
    console.log('Oplist app listening on port:- 5000')
    sequelize.authenticate()
        .then(() => {
            console.log("DB connected successfully!")
        })
        .catch((error) => {
            console.log(`DB not connected:- ${error}`)
        })
})

module.exports = app
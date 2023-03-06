const express = require("express")
const config = require("config")
const path = require("path")
const corsMiddleware = require("./middleware/cors.middleware")

const {Router} = require("express")
const router = Router()
const sqlite3 = require('sqlite3').verbose()
const fs = require("fs")


const app = express()

app.use(corsMiddleware)
app.use('/api/user', require('./routes/user.routes'))

// if (process.env.NODE_ENV === 'production'){
//     app.use('/', express.static(path.join(__dirname, 'client', 'build')))
//
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//     })
// }

//const PORT = process.env.PORT || config.get("port")

app.listen(5000, () => {console.log('Server has been started...')})
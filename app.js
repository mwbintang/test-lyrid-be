require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001
const route = require('./routes')
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/', route)
app.use(express.static('./public'))
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })
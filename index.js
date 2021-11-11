require('dotenv').config()
const express = require('express')
const parserRoutes = require('./routers/parser')

const app = express()
const  LISTEN_PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/parse', parserRoutes)

function start(){
    try {
        app.listen(LISTEN_PORT)
    }catch (e) {
        console.log(e)
    }
}

start()


//TODO: Сделать кэширование, чтобы можно было быстро отдавать
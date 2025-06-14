import mongoose from "mongoose";
import express from 'express';
import Launde from './models/launde.js'
import laundeRoute from "./routes/launde.routes.js";
import postsRoute from "./routes/posts.routes.js"
const app = express()
app.use(express.json())

app.use('/launde', laundeRoute)
app.use('/posts', postsRoute )

app.listen(1000, function () {

    mongoose.connect('mongodb://localhost:27017/Auth')
        .then(() => console.log("chl gya server lund ke re"))
        .catch(() =>
            console.log("chud gya server"))
})


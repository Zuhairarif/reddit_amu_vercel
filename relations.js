import express from 'express'
import mongoose from 'mongoose'

import friendsRoute from './routes/friend.route.js'
import userRoutes from './routes/user.route.js'
import authorsRoute from './routes/authors.route.js'
import booksRoute from './routes/books.route.js'
import userssRoute from './routes/users.route.js'
import tasksRoute from './routes/tasks.route.js'

const app = express()

app.use(express.json())

app.use('/friends', friendsRoute)
app.use('/user', userRoutes)
app.use('/authors', authorsRoute)
app.use('/books', booksRoute)
app.use('/userss', userssRoute)
app.use('/tasks', tasksRoute)


app.listen(1000, () => {
    mongoose.connect('mongodb://localhost:27017/').then(() => console.log('MongoDB started'))
})

// GET /friends/
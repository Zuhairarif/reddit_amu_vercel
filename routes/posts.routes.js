import {Router} from 'express'

import Posts from '../models/post.js'
const app = Router()

app.get('/', async (req, res) => {
    res.send(await Posts.find())
}) 
app.post('/', async (req, res) => {
    const test = req.body.text
    const id = req.body.userId
    // const {name} = req.body
    const post = new Posts({text: test, userId : id})
    await post.save()
    res.send(await Posts.find().populate('userId'))
}) 
app.get('/:id', async(req, res) => {
    res.send(await Posts.find({userId: req.params.id}))
    }) 
app.put('/:id', async (req, res) => {
    await Posts.findByIdAndUpdate(req.params.id, req.body)
    res.send(await Posts.find())
})
app.delete('/:id', async (req, res) => {
    await Posts.findByIdAndDelete(req.params.id)
    res.send(await Posts.find())
})
export default app

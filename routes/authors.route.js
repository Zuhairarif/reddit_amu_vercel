import {Router} from 'express'
import Users from '../models/authors.js'
import authors from '../models/authors.js'
const app = Router()

app.get('/', async (req, res) => {
    res.send(await authors.find())
}) 

app.post('/', async (req, res) => {
    const name = req.body.name
    // const {name} = req.body
    const author = new authors({name})
    await author.save()
    res.send(await authors.find())
})

app.put('/:id', async (req, res) => {
    await authors.findByIdAndUpdate(req.params.id, req.body)
    res.send(await authors.find())
})

app.delete('/:id', async (req, res) => {
    await authors.findByIdAndDelete(req.params.id)
    res.send(await authors.find())
})

export default app



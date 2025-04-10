import {Router} from 'express'
import Users from '../models/Users.js'
const app = Router()

app.get('/', async (req, res) => {
    res.send(await Users.find())
})  

app.post('/', async (req, res) => {
    const name = req.body.name
    const owner = new Users({ name })
    await owner.save()
    res.send(await Users.find())
})

app.put('/id', async (req, res) => {
    await Users.findByIdAndUpdate(req.params.id, req.body)
    res.send(await Users.find())
})

app.delete('/:id', async (req, res) => {
    await Users.findByIdAndDelete(req.params.id)
    res.send(await Users.find())
})

export default app



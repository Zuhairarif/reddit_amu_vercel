import {Router} from 'express'

import Launde from '../models/launde.js'
const app = Router()

app.get('/', async (req, res) => {
    res.send(await Launde.find())
}) 
app.post('/', async (req, res) => {
    const name1 = req.body.name
    const password1 = req.body.password
    // const {name} = req.body
    
    const name = new Launde({name: name1, password: password1})
    await name.save()
    res.send(await Launde.find().populate())
})

app.put('/:id', async (req, res) => {
    await Launde.findByIdAndUpdate(req.params.id, req.body)
    res.send(await Launde.find())
})
app.delete('/:id', async (req, res) => {
    await Launde.findByIdAndDelete(req.params.id)
    res.send(await Launde.find())
})
export default app

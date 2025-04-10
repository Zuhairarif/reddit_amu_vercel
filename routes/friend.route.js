import { Router } from "express";
import Friends from "../models/Friends.js";
const friendsRoute = Router()


friendsRoute.get('/', async (req, res) => {
    res.send(await Friends.find().populate('friendOf', 'name'));

})
friendsRoute.post('/', async (req, res) => {
    const name = req.body.name
    const phone = req.body.phone
    const friendOf = req.body.friendOf


    const friends = new Friends({ name, phone, friendOf })
    await friends.save()
    res.send(await Friends.find())
})
friendsRoute.put('/:id', async (req, res) => {
    await Friends.findByIdAndUpdate(req.params.id, req.body)
    res.send(await Friends.find())
})
friendsRoute.delete('/:id', async (req, res) => {
    await Friends.findByIdAndDelete(req.params.id)
    res.send(await Friends.find())
})


export default friendsRoute
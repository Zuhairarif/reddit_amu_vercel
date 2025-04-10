import { Router } from "express";
import tasks from "../models/tasks.js";

const tasksRoute = Router()
tasksRoute.get('/', async (req, res) => {
    res.send(await tasks.find().populate("userId"))
})
tasksRoute.post('/', async (req, res) => {
    const { title, userId } = req.body
    const task = new tasks({ title, completed: false, userId })
    await task.save();
    res.send(await tasks.find())
})
tasksRoute.put('/:id', async (req, res) => {
    await tasks.findByIdAndUpdate(req.params.id, req.body)
    res.send(await tasks.find())
})
tasksRoute.delete('/:id', async (req, res) => {
    await tasks.findByIdAndDelete(req.params.id)
    res.send(await tasks.find())
})

export default tasksRoute

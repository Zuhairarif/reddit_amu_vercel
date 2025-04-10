import { Router } from "express";
import books from "../models/books.js";

const booksRoute = Router()

booksRoute.get('/', async (req, res) => {
    res.send(await books.find())
})

booksRoute.post('/', async (req, res) => {
    const { name, year, ISBN, Price, authoredBy } = req.body
    const book = new books({ name, year, ISBN, Price, authoredBy })

    await book.save();
    res.send(await books.find())
})
 
booksRoute.put('/:id', async (req, res) => {
    await books.findByIdAndUpdate(req.params.id, req.body)
    res.send(await books.find())
})

booksRoute.delete('/:id', async (req, res) => {
    await books.findByIdAndDelete(req.params.id)
    res.send(await books.find())
})

export default booksRoute

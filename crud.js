import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.text())


const FriendScheme = new mongoose.Schema({
    name: String,
    age: Number,
})

const Friends = mongoose.model('friends', FriendScheme)


app.get('/', async function (req, res) {
    const read = await Friends.find()
    res.send(read)
})

app.post('/', async function (req, res) {
    const profile = new Friends({
        name: req.body,
        age: parseInt(Math.random() * 100)
    })
    // fs.writeFileSync(db, JSON.stringify(read2))
    await profile.save()
    res.send(await Friends.find())
})

app.put('/:id', async (req, res) => {
    const id = req.params.id
    const profile = await Friends.findByIdAndUpdate(id, {
        name: req.body
    })
    await profile.save()
    res.send(await Friends.find())
})

app.delete('/:name', async (req, res) => {
    const name = req.params.name
    await Friends.findOneAndDelete({
        name: name
    })
    res.send(await Friends.find())

})

app.listen(6969, () => {
    console.log("server started")



    mongoose.connect('mongodb://localhost:27017/zuhair')
        .then(() => console.log('MongoDB connected'))
        .catch(console.error)
    // if(!fs.readdirSync('.').includes('khazana.json'))
    // fs.writeFileSync(db, '[]')
}

)
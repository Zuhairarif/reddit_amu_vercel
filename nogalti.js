import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const ladki = new mongoose.Schema({
    name: String,
    boobs_size: Number,
});

const laundiya = mongoose.model("crushes", ladki);

app.get("/", async function (req, res) {
    const read = await laundiya.find();
    res.send(read);
});
app.post("/", async function (req, res) {
    const shawties = new laundiya({
        name: req.body.name,
        boobs_size: req.body.boobs_size,
    });
    await shawties.save();
    res.send(await laundiya.find());
});
app.put("/:name", async function (req, res) {
    const name = req.params.name;
    const shawties = await laundiya.findOneAndUpdate(
        {
            name: name,
        },
        {
            boobs_size: req.body.boobs_size,
        }
    );
    await shawties.save();
    res.send(await laundiya.find());
});
app.listen(9958, () => {
    mongoose
        .connect("mongodb+srv://admin:admin@cluster0.becqtsc.mongodb.net/zuhair?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("mongoose connected");
        })
        .catch(console.error);
});

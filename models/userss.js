import mongoose from "mongoose";
const userssSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String

})
export default mongoose.model('userss', userssSchema)

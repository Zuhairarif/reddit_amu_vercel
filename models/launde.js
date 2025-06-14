import mongoose, { Schema } from "mongoose";
const laundeSchema =  new mongoose.Schema({
    name: String,
    password: String 
})
export default mongoose.model('launde', laundeSchema)


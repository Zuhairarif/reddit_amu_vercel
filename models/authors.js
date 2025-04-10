import mongoose from "mongoose";
const authorsSchema = new mongoose.Schema({
    name: String
})
export default mongoose.model('authors', authorsSchema)

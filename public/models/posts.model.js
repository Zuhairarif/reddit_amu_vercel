import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "users"},
    question : String,
    details : String
})

export const Posts = mongoose.model("posts", postSchema)

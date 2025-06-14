import mongoose from "mongoose"
const commentSchema = new mongoose.Schema({
comment : String,
postId : {type: mongoose.Types.ObjectId, ref: "posts"}
});
export const Comments = mongoose.model("comments", commentSchema);


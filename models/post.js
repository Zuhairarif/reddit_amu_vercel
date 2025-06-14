import mongoose from 'mongoose'
const postsSchema  = new mongoose.Schema({
    text :  String,
    userId : {type: mongoose.Types.ObjectId, ref : 'launde' }
})

export default mongoose.model('posts', postsSchema)

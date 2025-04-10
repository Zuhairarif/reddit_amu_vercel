import mongoose from 'mongoose'
// import Users from './Users.js'
const FriendsScheme = new mongoose.Schema({
    name: String,
    phone: Number,
    friendOf: {type: mongoose.Types.ObjectId, ref:'user'}
})

export default mongoose.model('friends', FriendsScheme)
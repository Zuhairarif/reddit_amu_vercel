import mongoose from 'mongoose';
const tasksSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Types.ObjectId, ref: "userss" }
}, {
    timestamps: true
})
export default mongoose.model("tasks", tasksSchema)

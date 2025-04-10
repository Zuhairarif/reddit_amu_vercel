import mongoose from "mongoose";
const booksSchema = new mongoose.Schema(
    {
        name: String,
        year: Number,
        ISBN: Number,
        Price: Number,
        authoredBy: { type: mongoose.Types.ObjectId, ref: 'authors' }
    }
)
export default mongoose.model('books', booksSchema)

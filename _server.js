const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/reddit_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for threads and comments
const commentSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const threadSchema = new mongoose.Schema({
    title: String,
    content: String,
    id: String,
    timestamp: { type: Date, default: Date.now },
    comments: [commentSchema]
});

const Thread = mongoose.model('Thread', threadSchema);

// Middleware
app.use(bodyParser.json());

// Get threads for a specific faculty (e.g., agriculture)
app.get('/threads/:faculty', async (req, res) => {
    const faculty = req.params.faculty;
    const threads = await Thread.find({ faculty: faculty });
    res.json(threads);
});

// Post a new thread
app.post('/threads/:faculty', async (req, res) => {
    const faculty = req.params.faculty;
    const { title, content, id } = req.body;

    const newThread = new Thread({
        title,
        content,
        id,
        faculty,
    });

    await newThread.save();
    res.json(newThread);
});

// Post a comment to a specific thread
app.post('/threads/:faculty/:threadId/comments', async (req, res) => {
    const { faculty, threadId } = req.params;
    const { content } = req.body;

    const thread = await Thread.findById(threadId);
    thread.comments.push({ content });
    await thread.save();
    res.json(thread);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

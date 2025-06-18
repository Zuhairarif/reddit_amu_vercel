import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB Atlas URI
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Connect to MongoDB once
await client.connect();
const db = client.db("amu_forum");
console.log("✅ Connected to MongoDB Atlas");

// Mustache view engine setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ List of departments (same as your .mustache files)
const departments = [
  'agri', 'arts', 'commerce', 'education', 'engg', 'foreign', 'general', 'interdis',
  'law', 'management', 'medicine', 'poly', 'rca', 'science', 'social', 'theology'
];

// ✅ Dynamic routes for all departments
departments.forEach(dept => {
  const collection = db.collection(`threads_${dept}`);

  // Render department page with threads
  app.get(`/${dept}`, async (req, res) => {
    const threads = await collection.find().sort({ _id: -1 }).toArray();
    res.render(dept, { threads, dept });
  });

  // Handle new thread submission
  app.post(`/${dept}/love`, async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.redirect(`/${dept}`);

    const thread = {
      title,
      content,
      timestamp: new Date().toLocaleString(),
      id: Math.floor(Math.random() * 100000),
      user: `User-${Math.floor(Math.random() * 10000)}`,
      comments: []
    };

    await collection.insertOne(thread);
    res.redirect(`/${dept}`);
  });

  // Handle new comment submission
  app.post(`/${dept}/comment`, async (req, res) => {
    const { threadId, comment } = req.body;
    if (!comment.trim()) return res.redirect(`/${dept}`);

    const commentObj = {
      content: comment,
      user: `User-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toLocaleString()
    };

    await collection.updateOne(
      { id: parseInt(threadId) },
      { $push: { comments: commentObj } }
    );

    res.redirect(`/${dept}`);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

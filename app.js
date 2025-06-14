import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 5050;

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// View Engine Setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data
let threads = [];

// Home Route
app.get('/arts', (req, res) => {
  res.render('arts', { threads });
});


// Add Thread
app.post('/love', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.redirect('/');

  const newThread = {
    title,
    content,
    id: Math.floor(Math.random() * 100000),
    timestamp: new Date().toLocaleString(),
    comments: []
  };

  threads.unshift(newThread);
  res.redirect('/');
});

// Add Comment
app.post('/comment', (req, res) => {
  const { threadId, comment } = req.body;
  const thread = threads.find(t => t.id == threadId);

  if (thread && comment.trim()) {
    thread.comments.push({
      content: comment,
      id: `User-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toLocaleString()
    });
  }

  res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

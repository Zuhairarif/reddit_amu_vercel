const API_URL = 'http://localhost:5000';

document.getElementById('new-thread-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('thread-title').value;
    const content = document.getElementById('thread-content').value;

    const response = await fetch(`${API_URL}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: generateRandomID(),
            title,
            content,
            timestamp: new Date().toLocaleString(),
            comments: [],
        }),
    });

    const thread = await response.json();
    renderThread(thread);
    e.target.reset();
});

async function fetchThreads() {
    const response = await fetch(`${API_URL}/threads`);
    const threads = await response.json();
    threads.forEach(renderThread);
}

function renderThread(thread) {
    const threadsContainer = document.getElementById('threads');
    const threadElement = document.createElement('div');
    threadElement.classList.add('thread');
    threadElement.innerHTML = `
        <h3>${thread.title}</h3>
        <p>${thread.content}</p>
        <p><small>Posted by ${thread.id} on ${thread.timestamp}</small></p>
        <textarea placeholder="Add a comment"></textarea>
        <button onclick="addComment('${thread.id}', this.previousElementSibling.value)">Comment</button>
        <div class="comments">
            ${thread.comments.map(
                (comment) => `<div class="comment"><p>${comment.content}</p><small>${comment.id}</small></div>`
            ).join('')}
        </div>
    `;
    threadsContainer.appendChild(threadElement);
}

async function addComment(threadId, content) {
    const response = await fetch(`${API_URL}/threads/${threadId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: generateRandomID(),
            content,
            timestamp: new Date().toLocaleString(),
        }),
    });
    const thread = await response.json();
    document.getElementById('threads').innerHTML = '';
    fetchThreads();
}

function generateRandomID() {
    return `User-${Math.floor(1000 + Math.random() * 9000)}`;
}

document.addEventListener('DOMContentLoaded', fetchThreads);

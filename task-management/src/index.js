const express = require('express');
const app = express();
const port = 3000;

const tasks = [
  { id: 1, title: "Setup Node.js", completed: true, priority: "high", createdAt: new Date("2025-10-01") },
  { id: 2, title: "Learn Express", completed: true, priority: "high", createdAt: new Date("2025-10-08") },
  { id: 3, title: "Build API Routes", completed: false, priority: "medium", createdAt: new Date("2025-10-10") },
  { id: 4, title: "Test with Postman", completed: false, priority: "low", createdAt: new Date("2025-10-15") },
  { id: 5, title: "Push to GitHub", completed: false, priority: "high", createdAt: new Date() }
];

app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

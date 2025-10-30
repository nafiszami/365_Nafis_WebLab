const express = require('express');
const router = express.Router();


const tasks = [
  { id: 1, title: "Setup Node.js", completed: true, priority: "high", createdAt: new Date("2025-10-01") },
  { id: 2, title: "Learn Express", completed: true, priority: "high", createdAt: new Date("2025-10-05") },
  { id: 3, title: "Build API Routes", completed: false, priority: "medium", createdAt: new Date("2025-10-10") },
  { id: 4, title: "Test with Postman", completed: false, priority: "low", createdAt: new Date("2025-10-15") },
  { id: 5, title: "Push to Github", completed: false, priority: "high", createdAt: new Date() }
];


router.get('/tasks', (req, res) => {
  const response = tasks.map(t => ({
    id: t.id,
    title: t.title,
    completed: t.completed,
    priority: t.priority,
    createdAt: t.createdAt
  }));
  res.json(response);
});


router.get('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});


module.exports = router;
const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();
const PORT = 3000;


const tasks = [
  { id: 1, title: "Setup Node.js", completed: true, priority: "high", createdAt: new Date("2025-10-01") },
  { id: 2, title: "Learn Express", completed: true, priority: "high", createdAt: new Date("2025-10-05") },
  { id: 3, title: "Build API Routes", completed: false, priority: "medium", createdAt: new Date("2025-10-10") },
  { id: 4, title: "Test with Postman", completed: false, priority: "low", createdAt: new Date("2025-10-15") },
  { id: 5, title: "Push to Github", completed: false, priority: "high", createdAt: new Date() }
];

app.locals.tasks = tasks;

app.use(express.json());

app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Manager API' });
});

app.get('/health', (req, res) => {
  res.status(200).json( {
    status: "healthy",
    uptime: process.uptime()
  });
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

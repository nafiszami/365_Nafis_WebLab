const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();
const PORT = 3000;


const tasks = [
  { id: 1, title: 'Sample Task', completed: false }
];

app.locals.tasks = tasks;

app.use(express.json());

app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Manager API' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running smoothly' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

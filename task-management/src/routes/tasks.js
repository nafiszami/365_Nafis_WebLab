const express = require('express');
const router = express.Router();

// GET /tasks - Retrieve all tasks
router.get('/', (req, res) => {
  const tasks = req.app.locals.tasks;
  res.status(200).json({
    success: true,
    data: tasks
  });
});

// GET /task/:id - Retrieve task by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const tasks = req.app.locals.tasks;

  // Validate numeric ID
  const taskId = parseInt(id, 10);
  if (isNaN(taskId)) {
    return res.status(400).json({
      error: 'Invalid ID format'
    });
  }

  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
  try {
    const { title, priority } = req.body;

    // Input validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Title is required and must be a non-empty string'
      });
    }

    const validPriorities = ['low', 'medium', 'high'];
    const taskPriority = validPriorities.includes(priority) ? priority : 'medium';

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      priority: taskPriority,
      createdAt: new Date()
    };

    const tasks = req.app.locals.tasks;
    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;

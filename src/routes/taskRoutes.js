const express = require('express');
const taskController = require('../controllers/taskController');
const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema } = require('../schemas/taskSchema');

const router = express.Router();

router.route('/')
    .get(taskController.getAllTasks)
    .post(validate(createTaskSchema), taskController.createTask);

router.route('/:id')
    .get(taskController.getTask)
    .patch(validate(updateTaskSchema), taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;

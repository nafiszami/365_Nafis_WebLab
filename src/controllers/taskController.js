const TaskModel = require('../models/taskModel');
const AppError = require('../utils/AppError');

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.findAll();
        res.status(200).json({ status: 'success', data: tasks });
    } catch (err) {
        next(err);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const id = await TaskModel.create(req.body);
        res.status(201).json({ status: 'success', data: { id, ...req.body } });
    } catch (err) {
        next(err);
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        if (!task) return next(new AppError('Task not found', 404));
        res.status(200).json({ status: 'success', data: task });
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) return next(new AppError('No data provided', 400));
        
        const success = await TaskModel.update(req.params.id, req.body);
        if (!success) return next(new AppError('Task not found', 404));
        
        res.status(200).json({ status: 'success', message: 'Task updated' });
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const success = await TaskModel.delete(req.params.id);
        if (!success) return next(new AppError('Task not found', 404));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};


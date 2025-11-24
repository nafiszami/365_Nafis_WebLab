const express = require('express');
const router = express.Router();
const db = require('../config/db');
const logger = require('../logger'); // ← Add logger

// GET all tasks with pagination & search
router.get('/', async (req, res) => {
    try {
        let { page = 1, limit = 10, q } = req.query;
        page = parseInt(page); limit = parseInt(limit); if (limit > 50) limit = 50;

        let whereClause = 'WHERE deleted_at IS NULL';
        const params = [];
        if (q) { whereClause += ' AND title LIKE ?'; params.push(`%${q}%`); }

        const [countResult] = await db.query(`SELECT COUNT(*) as total FROM tasks ${whereClause}`, params);
        const totalTasks = countResult[0].total;

        const totalPages = Math.ceil(totalTasks / limit);
        const offset = (page - 1) * limit;

        const [tasks] = await db.query(
            `SELECT * FROM tasks ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        res.json({ totalTasks, totalPages, currentPage: page, limit, data: tasks });
    } catch (err) {
        logger.error(err.message, { stack: err.stack });
        res.status(500).json({ error: 'Database error' });
    }
});

// POST create task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') return res.status(400).json({ error: 'Title is required' });

  try {
    const [result] = await db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description || null]);
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updates = [], values = [];
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (status !== undefined) { updates.push('status = ?'); values.push(status); }
    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

    values.push(id);
    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });

    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Soft delete task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('UPDATE tasks SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found or already deleted' });
    res.status(200).json({ message: 'Task soft-deleted successfully' });
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Get soft-deleted tasks
router.get('/deleted', async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC');
    res.json(tasks);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: 'Database error' });
  }
});

// Restore soft-deleted task
router.put('/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('UPDATE tasks SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found or not deleted' });

    const [restoredTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(restoredTask[0]);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: 'Failed to restore task' });
  }
});

module.exports = router;

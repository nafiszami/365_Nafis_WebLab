const pool = require('../config/db');

exports.findAll = async () => {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
};

exports.create = async (taskData) => {
    const { title, description, status, priority, due_date } = taskData;
    
    const dateForDb = new Date(due_date); 

    const [result] = await pool.execute(
        'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
        [title, description, status, priority, dateForDb]
    );
    return result.insertId;
};

exports.update = async (id, taskData) => {
    if (taskData.due_date) {
        taskData.due_date = new Date(taskData.due_date);
    }

    const fields = Object.keys(taskData);
    const values = Object.values(taskData);
    const setClause = fields.map(f => `${f} = ?`).join(', ');

    console.log('[DEBUG] setClause:', setClause);
    console.log('[DEBUG] values:', values);
    
    const [result] = await pool.execute(
        `UPDATE tasks SET ${setClause} WHERE id = ?`,
        [...values, id]
    );
    return result.affectedRows > 0;
};

exports.delete = async (id) => {
    const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
};


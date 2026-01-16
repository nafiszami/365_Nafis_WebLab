import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/tasks');
        setTasks(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tasks. Please check if backend is running.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Create some tasks first!</p>
      ) : (
        tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;


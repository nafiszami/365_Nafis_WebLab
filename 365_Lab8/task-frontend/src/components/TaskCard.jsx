import './TaskCard.css';

const TaskCard = ({ task }) => {
  const { title, description, status, priority, due_date } = task;

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>
      
      {description && (
        <p className="task-description">{description}</p>
      )}
      
      <div className="task-meta">
        <span className={`status-badge status-${status}`}>
          {status}
        </span>
        <span className="priority">
          Priority: {priority}
        </span>
      </div>
      
      <div className="due-date">
        Due: {formatDate(due_date)}
      </div>
    </div>
  );
};

export default TaskCard;

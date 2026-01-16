import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Task Management Dashboard</h1>
      </header>
      
      <main>
        <TaskList />
      </main>
    </div>
  );
}

export default App;




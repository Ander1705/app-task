import { useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';

function TaskList({ tasks, onDelete, onToggleComplete, onEdit }) {
  const [expandedTask, setExpandedTask] = useState(null);

  if (tasks.length === 0) {
    return (
      <div className="py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-xl font-medium text-gray-500 mb-1">No hay tareas</h3>
        <p className="text-gray-400">No se encontraron tareas para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2 ml-1">
        {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} encontradas
      </h3>
      
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          expanded={expandedTask === task.id}
          onToggleExpand={() => {
            if (expandedTask === task.id) {
              setExpandedTask(null);
            } else {
              setExpandedTask(task.id);
            }
          }}
        />
      ))}
    </div>
  );
}

export default TaskList;
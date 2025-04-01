import { useState } from 'react';

function TaskItem({ task, onDelete, onToggleComplete, onEdit, expanded, onToggleExpand }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className={`border rounded-xl shadow-sm transition-all duration-300 overflow-hidden ${
        task.completed 
          ? 'bg-green-50 border-green-200' 
          : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-grow">
            <div className="pt-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors cursor-pointer"
              />
            </div>
            <div className="flex-grow">
              <div 
                onClick={onToggleExpand}
                className="cursor-pointer"
              >
                <h3 className={`text-lg font-semibold ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}>
                  {task.title}
                </h3>
                
                {task.description && !expanded && (
                  <p className={`mt-1 text-sm ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  } line-clamp-2`}>
                    {task.description}
                  </p>
                )}

                {task.description && expanded && (
                  <div className={`mt-3 text-sm ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  } bg-gray-50 p-3 rounded-lg`}>
                    {task.description}
                  </div>
                )}
                
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1 ml-2">
            {!task.completed && (
              <button 
                onClick={() => onEdit(task)}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Editar tarea"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Eliminar tarea"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Confirmation dialog */}
      {showDeleteConfirm && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 mb-3">
            ¿Estás seguro de que deseas eliminar esta tarea?
          </p>
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onDelete(task.id);
                setShowDeleteConfirm(false);
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
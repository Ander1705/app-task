// Importa el hook useState desde React
import { useState } from 'react';
// Importa el componente TaskItem
import TaskItem from '../TaskItem/TaskItem';

// Componente TaskList: recibe lista de tareas y funciones para manipularlas
function TaskList({ tasks, onDelete, onToggleComplete, onEdit }) {
  // Estado local para controlar qué tarea está expandida
  const [expandedTask, setExpandedTask] = useState(null);

  // Si no hay tareas, muestra un mensaje indicando que no hay datos
  if (tasks.length === 0) {
    return (
      <div className="py-16 text-center">
        {/* Ícono decorativo */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        {/* Mensaje principal */}
        <h3 className="text-xl font-medium text-gray-500 mb-1">No hay tareas</h3>
        {/* Mensaje secundario */}
        <p className="text-gray-400">No se encontraron tareas para mostrar.</p>
      </div>
    );
  }

  return (
    // Contenedor principal con espacio entre elementos
    <div className="space-y-4">
      {/* Encabezado mostrando el número de tareas encontradas */}
      <h3 className="text-lg font-semibold text-gray-700 mb-2 ml-1">
        {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} encontradas
      </h3>
      
      {/* Recorre cada tarea y renderiza un TaskItem */}
      {tasks.map(task => (
        <TaskItem
          key={task.id} // Clave única para cada elemento en el renderizado de listas
          task={task} // Objeto tarea actual
          onDelete={onDelete} // Función para eliminar tarea
          onToggleComplete={onToggleComplete} // Función para marcar como completada
          onEdit={onEdit} // Función para editar tarea
          expanded={expandedTask === task.id} // Indica si esta tarea está expandida
          onToggleExpand={() => {
            // Cambia el estado expandido: si ya está expandida, la contrae, si no, la expande
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

// Exporta el componente para usarlo en otros archivos
export default TaskList;

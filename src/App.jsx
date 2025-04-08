// Importa los hooks necesarios de React y bibliotecas externas
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Importa los componentes personalizados utilizados en la app
import TaskForm from './assets/components/TaskForm/TaskForm';
import TaskList from './assets/components/TaskList/TaskList';
import TaskFilter from './assets/components/TaskFilter/TaskFilter';
import TaskStats from './assets/components/TaskStats/TaskStats';

function App() {
  // Tarea de ejemplo por defecto si no hay nada en localStorage
  const initialTasks = [
    {
      id: uuidv4(), // ID único generado
      title: "Aprender React", // Título de la tarea
      description: "Estudiar los fundamentos de React incluyendo componentes, props y estado", // Descripción
      completed: false, // Estado de completado
      createdAt: new Date() // Fecha de creación
    }
  ];

  // Estado de la lista de tareas. Si hay tareas guardadas en localStorage, las carga; si no, usa la inicial
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Estado del filtro seleccionado: puede ser 'all', 'active' o 'completed'
  const [filter, setFilter] = useState('all');

  // Estado para saber si se está editando alguna tarea (objeto de tarea)
  const [editingTask, setEditingTask] = useState(null);

  // Cada vez que cambia la lista de tareas, se actualiza en localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filtra las tareas según el filtro activo: todas, solo activas o solo completadas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Función para añadir una nueva tarea a la lista
  const addTask = (title, description) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]); // Añade la nueva tarea al arreglo existente
  };

  // Función para actualizar una tarea existente por su ID
  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
    setEditingTask(null); // Al finalizar la edición, se limpia el estado
  };

  // Función para eliminar una tarea por su ID
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Cambia el estado de completado de una tarea (toggle)
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Coloca una tarea en modo edición
  const editTask = (task) => {
    setEditingTask(task);
  };

  // Renderizado principal de la aplicación
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-2">
          Gestión de Tareas
        </h1>
        <p className="text-center text-indigo-600 mb-10 font-medium">
          Organiza tus actividades de manera eficiente
        </p>

        {/* Formulario para crear o editar tareas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100 transition-all hover:shadow-xl">
          <TaskForm 
            onSubmit={addTask} 
            editingTask={editingTask}
            onUpdate={updateTask}
          />
        </div>

        {/* Sección de estadísticas, filtros y lista de tareas */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100 transition-all hover:shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <TaskStats tasks={tasks} />
            <TaskFilter filter={filter} setFilter={setFilter} />
          </div>

          <TaskList 
            tasks={filteredTasks} 
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={editTask}
          />
        </div>

        {/* Pie de página */}
        <footer className="mt-12 text-center text-sm text-indigo-500">
          <p>© {new Date().getFullYear()} Gestión de Tareas App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

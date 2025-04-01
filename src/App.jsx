import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './assets/components/TaskForm/TaskForm';
import TaskList from './assets/components/TaskList/TaskList';
import TaskFilter from './assets/components/TaskFilter/TaskFilter';
import TaskStats from './assets/components/TaskStats/TaskStats';

function App() {
  // Modelo de datos para las tareas
  const initialTasks = [
    {
      id: uuidv4(),
      title: "Aprender React",
      description: "Estudiar los fundamentos de React incluyendo componentes, props y estado",
      completed: false,
      createdAt: new Date()
    }
  ];

  // Estados principales
  const [tasks, setTasks] = useState(() => {
    // Intenta cargar tareas desde localStorage
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingTask, setEditingTask] = useState(null);

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filtrar tareas según el filtro seleccionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Añadir nueva tarea
  const addTask = (title, description) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  // Actualizar una tarea existente
  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
    setEditingTask(null);
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Marcar tarea como completada
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Establecer tarea para edición
  const editTask = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-2">
          Gestión de Tareas
        </h1>
        <p className="text-center text-indigo-600 mb-10 font-medium">
          Organiza tus actividades de manera eficiente
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100 transition-all hover:shadow-xl">
          <TaskForm 
            onSubmit={addTask} 
            editingTask={editingTask}
            onUpdate={updateTask}
          />
        </div>
        
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
        
        <footer className="mt-12 text-center text-sm text-indigo-500">
          <p>© {new Date().getFullYear()} Gestión de Tareas App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
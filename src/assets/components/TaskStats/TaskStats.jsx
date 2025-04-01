function TaskStats({ tasks }) {
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    const completionPercentage = tasks.length > 0 
      ? Math.round((completedTasks.length / tasks.length) * 100) 
      : 0;
  
    return (
      <div className="bg-indigo-50 rounded-lg p-4 w-full sm:max-w-sm">
        <h3 className="text-sm font-medium text-indigo-900 mb-2">Resumen de Tareas</h3>
        
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-indigo-700">Progreso</div>
          <div className="text-xs font-medium text-indigo-900">{completionPercentage}%</div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-2 rounded shadow-sm">
            <div className="text-xl font-bold text-gray-800">{tasks.length}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="bg-yellow-50 p-2 rounded shadow-sm">
            <div className="text-xl font-bold text-yellow-700">{pendingTasks.length}</div>
            <div className="text-xs text-yellow-600">Pendientes</div>
          </div>
          <div className="bg-green-50 p-2 rounded shadow-sm">
            <div className="text-xl font-bold text-green-700">{completedTasks.length}</div>
            <div className="text-xs text-green-600">Completadas</div>
          </div>
        </div>
      </div>
    );
  }
  
  export default TaskStats;
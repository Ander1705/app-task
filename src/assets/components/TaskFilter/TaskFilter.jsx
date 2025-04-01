function TaskFilter({ filter, setFilter }) {
    const filters = [
      { value: 'all', label: 'Todas', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      )},
      { value: 'active', label: 'Pendientes', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )},
      { value: 'completed', label: 'Completadas', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    ];
  
    return (
      <div className="inline-flex p-1 bg-gray-100 rounded-lg shadow-inner">
        {filters.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 text-sm rounded-md transition-all duration-200 flex items-center ${
              filter === value 
                ? 'bg-white text-indigo-700 font-medium shadow' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    );
  }
  
  export default TaskFilter;
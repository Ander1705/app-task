// Componente TaskFilter: permite filtrar las tareas por estado
function TaskFilter({ filter, setFilter }) {
  // Lista de filtros disponibles con sus valores, etiquetas e íconos SVG
  const filters = [
    {
      value: 'all', // Valor del filtro
      label: 'Todas', // Etiqueta visible
      icon: (
        // Ícono para "Todas"
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      )
    },
    {
      value: 'active', // Valor para tareas pendientes
      label: 'Pendientes',
      icon: (
        // Ícono para "Pendientes"
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: 'completed', // Valor para tareas completadas
      label: 'Completadas',
      icon: (
        // Ícono para "Completadas"
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];
  
  return (
    // Contenedor de los botones de filtro con estilo visual
    <div className="inline-flex p-1 bg-gray-100 rounded-lg shadow-inner">
      {/* Mapeo de cada filtro para renderizar un botón */}
      {filters.map(({ value, label, icon }) => (
        <button
          key={value} // Clave única por cada filtro
          onClick={() => setFilter(value)} // Al hacer clic, se cambia el filtro
          className={`px-4 py-2 text-sm rounded-md transition-all duration-200 flex items-center ${
            filter === value 
              ? 'bg-white text-indigo-700 font-medium shadow' // Estilo si está seleccionado
              : 'text-gray-600 hover:text-gray-800' // Estilo normal
          }`}
        >
          {/* Ícono e etiqueta del filtro */}
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

// Exporta el componente para su uso en otros archivos
export default TaskFilter;

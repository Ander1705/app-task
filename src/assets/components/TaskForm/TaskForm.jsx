import { useState, useEffect } from "react";

// Componente TaskForm: maneja el formulario para agregar o editar tareas
function TaskForm({ onSubmit, editingTask, onUpdate }) {
  // Estados para título, descripción y errores del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Determina si se está editando una tarea
  const isEditing = !!editingTask;

  // useEffect para rellenar los campos si se está editando una tarea
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      resetForm();
    }
  }, [editingTask]);

  // Función para limpiar los campos del formulario
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setError("");
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: el título no puede estar vacío
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    // Si se está editando, se actualiza la tarea
    if (isEditing) {
      onUpdate(editingTask.id, { title, description });
    } else {
      // Si no, se crea una nueva tarea
      onSubmit(title, description);
    }

    // Limpiar el formulario después de enviar
    resetForm();
  };

  return (
    <div>
      {/* Título del formulario que cambia según el modo (editar o crear) */}
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
        {isEditing ? (
          <>
            {/* Ícono de edición */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Editar Tarea
          </>
        ) : (
          <>
            {/* Ícono de agregar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Añadir Nueva Tarea
          </>
        )}
      </h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          {/* Campo de título */}
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) setError(""); // Borra error si se escribe algo
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              error ? "border-red-300 ring-1 ring-red-300" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
            placeholder="¿Qué necesitas hacer?"
          />
          {/* Mostrar mensaje de error si el título está vacío */}
          {error && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div>
          {/* Campo de descripción */}
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            rows="4"
            placeholder="Describe los detalles de la tarea (opcional)"
          ></textarea>
        </div>

        {/* Botones de acción: añadir/actualizar o cancelar */}
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className={`px-5 py-3 rounded-lg font-medium flex items-center justify-center text-white ${
              isEditing
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isEditing ? "focus:ring-emerald-500" : "focus:ring-indigo-500"
            } transition-colors`}
          >
            {isEditing ? (
              <>
                {/* Ícono actualizar */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Actualizar
              </>
            ) : (
              <>
                {/* Ícono añadir */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Añadir
              </>
            )}
          </button>

          {/* Botón cancelar visible solo si se está editando */}
          {isEditing && (
            <button
              type="button"
              onClick={() => resetForm()}
              className="px-5 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;

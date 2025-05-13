import React, { useState } from 'react';


//esta es la vista inicial donde inicia la aplicacion donde digitamos el nombre del usuario
const Principal = ({ onNameSubmit, initialName = '' }) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      backgroundImage: "url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0om3zHsOgDjdvqUQH6XhKYIiaSc3LCtrM1fen')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundBlendMode: 'overlay',
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }}>
     
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xl w-full border border-gray-200 backdrop-blur-sm bg-opacity-90">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 font-serif">
            {initialName ? 'Cambiar usuario' : 'Bienvenido a Intervalos De Confianza Pro'}
          </h1>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {initialName ? 'Nuevo nombre de usuario' : 'Ingrese su nombre'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400"
                placeholder={initialName || "Ej: Digita tu nombre"}
                required
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {initialName ? 'Actualizar' : 'Continuar'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Principal;

// DONE
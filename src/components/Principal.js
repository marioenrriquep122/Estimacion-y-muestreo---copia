import React, { useState, useEffect } from 'react';

const Principal = ({ onNameSubmit, initialName = '' }) => {
  const [name, setName] = useState(initialName);
  const [isValid, setIsValid] = useState(!!initialName);
  const [showIntro, setShowIntro] = useState(true);

  // Validar nombre cuando cambia
  useEffect(() => {
    setIsValid(name.trim().length > 0);
  }, [name]);

  // Efecto para animar la entrada gradual de la interfaz
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit(e);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center transition-all duration-500"
      style={{
        backgroundImage: "url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0om3zHsOgDjdvqUQH6XhKYIiaSc3LCtrM1fen')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <div 
        className={`bg-white rounded-xl shadow-2xl p-8 max-w-xl w-full border border-gray-200 backdrop-blur-sm bg-opacity-90 transition-all duration-500 ${
          showIntro ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 font-serif">
            {initialName ? 'Cambiar usuario' : 'Bienvenido a Intervalos De Confianza Pro'}
          </h1>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
          
          {!initialName && (
            <p className="text-gray-600 mt-4 max-w-md mx-auto">
              Esta aplicación te permite calcular intervalos de confianza estadísticos 
              con facilidad y precisión.
            </p>
          )}
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {initialName ? 'Nuevo nombre de usuario' : 'Ingrese su nombre'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400 transition-colors ${
                  name.trim() === '' ? 'border-gray-300' : isValid ? 'border-green-400' : 'border-red-300'
                }`}
                placeholder={initialName || "Ej: Andrea "}
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {name.trim() !== '' && (
                  isValid ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )
                )}
                {name.trim() === '' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            {name.trim() === '' && (
              <p className="text-gray-500 text-xs mt-1">Por favor ingrese su nombre para continuar</p>
            )}
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isValid 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {initialName ? 'Actualizar' : 'Continuar'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {!initialName && (
            <div className="pt-4 text-center text-gray-500 text-sm">
              <p>Versión 2.0 · Desarrollado por <span className="font-medium">Equipo de Estadística</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Principal;
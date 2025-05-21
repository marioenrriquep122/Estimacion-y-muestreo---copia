import React, { useState, useEffect } from 'react';

// Componente mejorado para la visualización gráfica de intervalos
const GraficaDeIntervalos = ({ interval }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Verificamos que el intervalo sea válido (misma lógica original)
  const isValidInterval =
    interval &&
    typeof interval.lower === 'number' &&
    typeof interval.upper === 'number' &&
    !isNaN(interval.lower) &&
    !isNaN(interval.upper);
  
  // Calculamos el rango y el centro (misma lógica original)
  const range = interval.upper - interval.lower;
  const center = (interval.upper + interval.lower) / 2;
  
  // Activamos la animación después de cargar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Función para formatear números con dos decimales
  const formatNumber = (num) => {
    return Math.round(num * 100) / 100;
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 mt-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="bg-blue-500 w-2 h-6 rounded mr-2"></span>
        Visualización del Intervalo
      </h2>
      
      {/* Contenedor principal de la gráfica */}
      <div className="mb-8">
        {/* Barra del intervalo */}
        <div className="relative h-16 w-full bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          {/* Barra del intervalo con animación */}
          <div
            className={`absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${(interval.lower - (center - range * 2)) / (range * 4) * 100}%`,
              right: `${100 - (interval.upper - (center - range * 2)) / (range * 4) * 100}%`,
            }}
          ></div>
          
          {/* Marcadores de límites del intervalo */}
          <div 
            className={`absolute top-0 bottom-0 w-0.5 bg-blue-800 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              left: `${(interval.lower - (center - range * 2)) / (range * 4) * 100}%`,
            }}
          >
            <div className="absolute -left-1 top-0 w-2 h-2 bg-blue-800 rounded-full"></div>
            <div className="absolute -left-1 bottom-0 w-2 h-2 bg-blue-800 rounded-full"></div>
          </div>
          
          <div 
            className={`absolute top-0 bottom-0 w-0.5 bg-blue-800 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              left: `${(interval.upper - (center - range * 2)) / (range * 4) * 100}%`,
            }}
          >
            <div className="absolute -left-1 top-0 w-2 h-2 bg-blue-800 rounded-full"></div>
            <div className="absolute -left-1 bottom-0 w-2 h-2 bg-blue-800 rounded-full"></div>
          </div>
          
          {/* Línea central (estimación puntual) */}
          <div
            className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-red-600 shadow-lg transition-all duration-700 delay-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              left: `${(center - (center - range * 2)) / (range * 4) * 100}%`,
            }}
          >
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md"></div>
          </div>
          
          {/* Marcas de escala en la barra */}
          <div className="absolute w-full h-full flex justify-between px-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-full flex flex-col justify-end">
                <div className="w-px h-2 bg-gray-400"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Etiquetas de escala */}
        <div className="mt-2 grid grid-cols-5 text-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="text-xs text-gray-500">
              {formatNumber(center - range * 2 + i * range)}
            </span>
          ))}
        </div>
      </div>
      
      {/* Información del intervalo */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide text-gray-500">Intervalo</span>
            <span className="font-mono text-sm text-gray-800 mt-1">
              [{formatNumber(interval.lower)}, {formatNumber(interval.upper)}]
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide text-gray-500">Estimación puntual</span>
            <span className="font-mono text-sm text-gray-800 mt-1">{formatNumber(center)}</span>
          </div>
        </div>
      </div>
      
      {/* Leyenda */}
      <div className="mt-6 flex items-center justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm shadow-sm mr-2"></div>
          <span className="text-sm text-gray-700">Intervalo de confianza</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-sm mr-2"></div>
          <span className="text-sm text-gray-700">Estimación puntual</span>
        </div>
      </div>
    </div>
  );
};

export default GraficaDeIntervalos;
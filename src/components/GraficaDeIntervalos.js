import React from 'react';
// es una vista donde mostramos graficamente la vizualisacion de intervalos
const GraficaDeIntervalos = ({ interval }) => {
  const isValidInterval =
    interval &&
    typeof interval.lower === 'number' &&
    typeof interval.upper === 'number' &&
    !isNaN(interval.lower) &&
    !isNaN(interval.upper);
  
  const range = interval.upper - interval.lower;
  const center = (interval.upper + interval.lower) / 2;
  
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Visualización del Intervalo</h2>
      <div className="relative h-20 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-500"
          style={{
            left: `${(interval.lower - (center - range * 2)) / (range * 4) * 100}%`,
            right: `${100 - (interval.upper - (center - range * 2)) / (range * 4) * 100}%`,
          }}
        ></div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500"
          style={{ left: '50%' }}
        ></div>
      </div>
      <div className="mt-4 grid grid-cols-3 text-center">
        <span className="text-xs text-gray-500">{Math.round((center - range * 2) * 100) / 100}</span>
        <span className="text-xs text-gray-500 font-medium">{Math.round(center * 100) / 100}</span>
        <span className="text-xs text-gray-500">{Math.round((center + range * 2) * 100) / 100}</span>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Intervalo de confianza</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-700">Estimación puntual</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficaDeIntervalos;
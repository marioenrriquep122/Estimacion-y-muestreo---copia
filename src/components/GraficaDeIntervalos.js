// GraficaDeIntervalos.jsx
import React, { useState, useEffect } from 'react';

const GraficaDeIntervalos = ({ interval }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  const isValidInterval =
    interval &&
    typeof interval.lower === 'number' &&
    typeof interval.upper === 'number' &&
    !isNaN(interval.lower) &&
    !isNaN(interval.upper);

  if (!isValidInterval) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 mt-6 border border-gray-100">
        <div className="text-center text-gray-500">
          <p>No hay datos de intervalo para mostrar</p>
        </div>
      </div>
    );
  }

  const range = interval.upper - interval.lower;
  const center = (interval.upper + interval.lower) / 2;
  const confidenceLevel = interval.confidenceLevel || 95;

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [interval.lower, interval.upper, confidenceLevel]);

  const formatNumber = (num) => Math.round(num * 100) / 100;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 mt-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="bg-blue-500 w-2 h-6 rounded mr-2"></span>
          Visualización del Intervalo
        </h2>
        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {confidenceLevel}% confianza
        </div>
      </div>

      <div className="mb-8">
        <div className="relative h-16 w-full bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <div
            className={`absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${(interval.lower - (center - range * 2)) / (range * 4) * 100}%`,
              right: `${100 - (interval.upper - (center - range * 2)) / (range * 4) * 100}%`,
            }}
          ></div>
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
          <div
            className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-red-600 shadow-lg transition-all duration-700 delay-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              left: `${(interval.type === 'twoPopulations' ? 0 : center - (center - range * 2)) / (range * 4) * 100}%`,
            }}
          >
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md"></div>
          </div>
          <div className="absolute w-full h-full flex justify-between px-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-full flex flex-col justify-end">
                <div className="w-px h-2 bg-gray-400"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-5 text-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="text-xs text-gray-500">
              {formatNumber(center - range * 2 + i * range)}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide text-gray-500">Intervalo</span>
            <span className="font-mono text-sm text-gray-800 mt-1">
              [{formatNumber(interval.lower)}, {formatNumber(interval.upper)}]
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              {interval.type === 'twoPopulations' ? 'Diferencia de medias' : 'Punto central'}
            </span>
            <span className="font-mono text-sm text-gray-800 mt-1">
              {interval.type === 'twoPopulations' ? formatNumber(interval.diffMean || 0) : formatNumber(center)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm shadow-sm mr-2"></div>
          <span className="text-sm text-gray-700">Intervalo de confianza</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-sm mr-2"></div>
          <span className="text-sm text-gray-700">
            {interval.type === 'twoPopulations' ? 'Diferencia nula (0)' : 'Valor central'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GraficaDeIntervalos;
import React, { useState } from 'react';

// Componente DataDisplay mejorado visualmente
const DataDisplay = ({ data }) => {
  // Estado para manejar el tipo de visualización
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  
  // Cálculos estadísticos básicos
  const average = data.length > 0 
    ? (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(2) 
    : 0;
  
  const min = data.length > 0 ? Math.min(...data).toFixed(2) : 0;
  const max = data.length > 0 ? Math.max(...data).toFixed(2) : 0;
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-2 h-8 bg-purple-500 rounded mr-2"></div>
          <h2 className="text-xl font-bold text-gray-800">Datos Generados Aleatoriamente</h2>
        </div>
        
        {/* Controles de visualización */}
        <div className="flex space-x-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-l-lg transition ${
              viewMode === 'grid' 
                ? 'bg-purple-100 text-purple-600' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-r-lg transition ${
              viewMode === 'list' 
                ? 'bg-purple-100 text-purple-600' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Resumen estadístico */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="bg-purple-50 px-3 py-2 rounded-lg flex items-center">
          <div className="mr-2 text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-purple-600 font-medium">Promedio</div>
            <div className="text-sm font-bold text-gray-700">{average}</div>
          </div>
        </div>
        
        <div className="bg-purple-50 px-3 py-2 rounded-lg flex items-center">
          <div className="mr-2 text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-purple-600 font-medium">Mínimo</div>
            <div className="text-sm font-bold text-gray-700">{min}</div>
          </div>
        </div>
        
        <div className="bg-purple-50 px-3 py-2 rounded-lg flex items-center">
          <div className="mr-2 text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-purple-600 font-medium">Máximo</div>
            <div className="text-sm font-bold text-gray-700">{max}</div>
          </div>
        </div>
      </div>
      
      {/* Datos con scroll */}
      <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-60 shadow-inner border border-gray-100">
        {viewMode === 'grid' ? (
          // Vista en cuadrícula (original)
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-2 rounded border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all text-center"
              >
                <span className="text-sm font-medium text-gray-700">{value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          // Vista en lista
          <div className="space-y-1">
            {data.map((value, index) => (
              <div 
                key={index} 
                className="bg-white px-3 py-2 rounded border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex justify-between items-center"
              >
                <span className="text-xs text-gray-500">#{index + 1}</span>
                <span className="text-sm font-medium text-gray-700">{value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Contador y acciones */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Total: <span className="font-semibold ml-1">{data.length}</span> valores generados
        </div>
        
        {/* Indicador de rango */}
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-1.5 w-24">
            <div 
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-1.5 rounded-full" 
              style={{ width: `${Math.min(100, (data.length / 100) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
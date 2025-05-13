import React, { useState } from 'react';
import ManualData from './ManualData';
import RandomData from './RandomData';

//esta componente trabaja de una forma que da dos opciones al usuario ingresar datos manuales o automaticos

const SeleccionDeDatos = ({ userName, onDataReady, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl mx-auto" style={{
      backgroundImage: "url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0om3zHsOgDjdvqUQH6XhKYIiaSc3LCtrM1fen')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundBlendMode: 'overlay',
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }}>
      <div className="flex justify-between items-start mb-4 mt-12 ">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Bienvenido, {userName}!
          </h2>
          <p className="text-gray-600">
            Este proyecto es para estimación y muestreo por intervalos de confianza.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors shadow-md"
        >
          Volver
        </button>
      </div>
      
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Seleccione el método de entrada de datos:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedOption('manual')}
            className={`py-3 px-4 rounded-lg transition-colors shadow-md ${
              selectedOption === 'manual'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <span className="font-medium">Datos Manuales</span>
            <p className="text-sm text-blue-100 mt-1">
              Ingresar valores uno por uno
            </p>
          </button>
          
          <button
            onClick={() => setSelectedOption('random')}
            className={`py-3 px-4 rounded-lg transition-colors shadow-md ${
              selectedOption === 'random'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <span className="font-medium">Generar Datos Aleatorios</span>
            <p className="text-sm text-blue-100 mt-1">
              Crear muestra aleatoria automáticamente
            </p>
          </button>
        </div>
        
        {selectedOption === 'manual' && (
          <ManualData onDataReady={onDataReady} />
        )}
        
        {selectedOption === 'random' && (
          <RandomData 
            onDataReady={onDataReady} 
            key={selectedOption}
          />
        )}
      </div>
    </div>
  );
};

export default SeleccionDeDatos;
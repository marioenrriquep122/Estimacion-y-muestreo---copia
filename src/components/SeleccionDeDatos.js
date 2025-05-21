import React, { useState } from 'react';
import ManualData from './ManualData';
import RandomData from './RandomData';

const SeleccionDeDatos = ({ userName, onDataReady, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderOptionButton = (option, title, description) => {
    const isSelected = selectedOption === option;
    return (
      <button
        onClick={() => setSelectedOption(option)}
        className={`w-full text-left py-4 px-5 rounded-2xl transition-all duration-200 shadow-md border-2 ${
          isSelected
            ? 'bg-indigo-600 text-white border-indigo-700'
            : 'bg-white hover:bg-indigo-50 text-gray-800 border-gray-200'
        }`}
      >
        <h4 className="text-md font-semibold">{title}</h4>
        <p className="text-sm mt-1">
          {description}
        </p>
      </button>
    );
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto"
      style={{
        backgroundImage: "url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0om3zHsOgDjdvqUQH6XhKYIiaSc3LCtrM1fen')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
      }}
    >
      <header className="flex justify-between items-start mb-6 mt-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido, {userName}!</h2>
          <p className="text-gray-600 mt-1">
            Este proyecto es para estimación y muestreo por intervalos de confianza.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-colors"
        >
          Volver
        </button>
      </header>

      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Seleccione el método de entrada de datos:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderOptionButton('manual', 'Datos Manuales', 'Ingresar valores uno por uno')}
            {renderOptionButton('random', 'Generar Datos Aleatorios', 'Crear muestra aleatoria automáticamente')}
          </div>
        </div>

        <div className="mt-6">
          {selectedOption === 'manual' && <ManualData onDataReady={onDataReady} />}
          {selectedOption === 'random' && <RandomData onDataReady={onDataReady} key={selectedOption} />}
        </div>
      </section>
    </div>
  );
};

export default SeleccionDeDatos;

import React, { useState } from 'react';

//esta es la vista donde selecionamos datos de forma manual es un div basicamente 
const ManualData = ({ onDataReady }) => {
  const [dataPoints, setDataPoints] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataArray = dataPoints.split(',').map(Number).filter(n => !isNaN(n));
    if (dataArray.length > 0) {
      const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const stdDev = Math.sqrt(
        dataArray.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / (dataArray.length - 1)
      );
      onDataReady({
        mean,
        stdDev,
        sampleSize: dataArray.length
      });
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valores (separados por comas)
          </label>
          <input
            type="text"
            value={dataPoints}
            onChange={(e) => setDataPoints(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 12.5, 14.3, 11.9, 13.2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md"
        >
          Calcular Estadísticos
        </button>
      </form>
    </div>
  );
};

export default ManualData;

// DONE
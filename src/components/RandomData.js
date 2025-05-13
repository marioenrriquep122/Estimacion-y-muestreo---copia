import React, { useState } from 'react';

//este componente o vista genere los datos automaticos y carga los datos en vista 
const RandomData = ({ onDataReady }) => {
  const [sampleSize, setSampleSize] = useState(30);
  const [mean, setMean] = useState(50);
  const [stdDev, setStdDev] = useState(10);

  const generateData = () => {
    const data = Array.from({ length: sampleSize }, () => {
      let u = 0, v = 0;
      while(u === 0) u = Math.random();
      while(v === 0) v = Math.random();
      const normal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      return mean + stdDev * normal;
    });
    
    const generatedMean = data.reduce((a, b) => a + b, 0) / data.length;
    const generatedStdDev = Math.sqrt(
      data.reduce((sq, n) => sq + Math.pow(n - generatedMean, 2), 0) / (data.length - 1)
    );
    
    onDataReady({
      mean: generatedMean,
      stdDev: generatedStdDev,
      sampleSize: data.length,
      generatedData: data
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tamaño de Muestra
          </label>
          <input
            type="number"
            min="2"
            max="1000"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Media Poblacional
          </label>
          <input
            type="number"
            step="0.1"
            value={mean}
            onChange={(e) => setMean(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desviación Estándar
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={stdDev}
            onChange={(e) => setStdDev(parseFloat(e.target.value) || 0.1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={generateData}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md"
        >
          Generar Datos Aleatorios
        </button>
      </div>
    </div>
  );
};

export default RandomData;
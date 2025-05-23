// TwoPopulationInput.jsx
import React, { useState, useEffect } from 'react';

const TwoPopulationInput = ({ onDataReady }) => {
  const [pop1Mean, setPop1Mean] = useState('');
  const [pop1StdDev, setPop1StdDev] = useState('');
  const [pop1SampleSize, setPop1SampleSize] = useState('');
  const [pop2Mean, setPop2Mean] = useState('');
  const [pop2StdDev, setPop2StdDev] = useState('');
  const [pop2SampleSize, setPop2SampleSize] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const validateAndSetStats = () => {
      try {
        const p1Mean = parseFloat(pop1Mean);
        const p1StdDev = parseFloat(pop1StdDev);
        const p1Size = parseInt(pop1SampleSize);
        const p2Mean = parseFloat(pop2Mean);
        const p2StdDev = parseFloat(pop2StdDev);
        const p2Size = parseInt(pop2SampleSize);

        if (!p1Mean || !p1StdDev || !p1Size || !p2Mean || !p2StdDev || !p2Size) {
          throw new Error('Todos los campos deben estar llenos');
        }

        if (p1Size < 2 || p2Size < 2) {
          throw new Error('El tamaño de muestra debe ser al menos 2');
        }

        if (p1StdDev <= 0 || p2StdDev <= 0) {
          throw new Error('La desviación estándar debe ser mayor que 0');
        }

        setStats({
          type: 'twoPopulations',
          pop1: { mean: p1Mean, stdDev: p1StdDev, sampleSize: p1Size },
          pop2: { mean: p2Mean, stdDev: p2StdDev, sampleSize: p2Size },
          confidenceLevel: confidenceLevel,
        });
        setError('');
      } catch (err) {
        setError(err.message);
        setStats(null);
      }
    };

    validateAndSetStats();
  }, [pop1Mean, pop1StdDev, pop1SampleSize, pop2Mean, pop2StdDev, pop2SampleSize, confidenceLevel]);

  const handleSubmit = () => {
    if (stats) {
      onDataReady(stats);
    } else if (!error) {
      setError('Por favor, ingrese valores válidos');
    }
  };

  const handleClear = () => {
    setPop1Mean('');
    setPop1StdDev('');
    setPop1SampleSize('');
    setPop2Mean('');
    setPop2StdDev('');
    setPop2SampleSize('');
    setConfidenceLevel(95);
    setError('');
    setStats(null);
  };

  const handleExample = () => {
    setPop1Mean('50.2838');
    setPop1StdDev('9.8309');
    setPop1SampleSize('30');
    setPop2Mean('48.5'); // Ejemplo para Población 2
    setPop2StdDev('10.0');
    setPop2SampleSize('25');
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Datos de la Población 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media muestral</label>
              <input
                type="number"
                value={pop1Mean}
                onChange={(e) => setPop1Mean(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 50.2838"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desviación estándar</label>
              <input
                type="number"
                value={pop1StdDev}
                onChange={(e) => setPop1StdDev(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 9.8309"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño muestral</label>
              <input
                type="number"
                value={pop1SampleSize}
                onChange={(e) => setPop1SampleSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 30"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Datos de la Población 2</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media muestral</label>
              <input
                type="number"
                value={pop2Mean}
                onChange={(e) => setPop2Mean(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 48.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desviación estándar</label>
              <input
                type="number"
                value={pop2StdDev}
                onChange={(e) => setPop2StdDev(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 10.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño muestral</label>
              <input
                type="number"
                value={pop2SampleSize}
                onChange={(e) => setPop2SampleSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 25"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de confianza (%)</label>
          <div className="flex items-center space-x-2">
            {[90, 95, 99].map((level) => (
              <label
                key={level}
                className={`flex-1 border ${
                  confidenceLevel === level
                    ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:bg-gray-50'
                } rounded-lg py-3 cursor-pointer transition flex items-center justify-center`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  value={level}
                  checked={confidenceLevel === level}
                  onChange={() => setConfidenceLevel(level)}
                />
                <span className={`text-lg font-medium ${confidenceLevel === level ? 'text-blue-600' : 'text-gray-700'}`}>
                  {level}%
                </span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={handleExample}
            className="text-blue-600 hover:text-blue-800"
          >
            Usar ejemplo
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="text-blue-600 hover:text-blue-800"
          >
            Limpiar
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!stats}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors shadow-md ${
            stats
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Calcular Intervalo
        </button>
      </div>

      {stats && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Parámetros extraídos:</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">Población 1 - Media:</span> {stats.pop1.mean}</li>
            <li><span className="font-medium">Población 1 - Desviación estándar:</span> {stats.pop1.stdDev}</li>
            <li><span className="font-medium">Población 1 - Tamaño:</span> {stats.pop1.sampleSize}</li>
            <li><span className="font-medium">Población 2 - Media:</span> {stats.pop2.mean}</li>
            <li><span className="font-medium">Población 2 - Desviación estándar:</span> {stats.pop2.stdDev}</li>
            <li><span className="font-medium">Población 2 - Tamaño:</span> {stats.pop2.sampleSize}</li>
            <li><span className="font-medium">Nivel de confianza:</span> {stats.confidenceLevel}%</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TwoPopulationInput;
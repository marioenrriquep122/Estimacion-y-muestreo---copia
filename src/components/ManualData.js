import React, { useState, useEffect } from 'react';

const ManualData = ({ onDataReady }) => {
  const [dataPoints, setDataPoints] = useState('');
  const [error, setError] = useState('');
  const [validData, setValidData] = useState([]);
  const [statistics, setStatistics] = useState(null);

  // Validar y procesar los datos cada vez que cambia el input
  useEffect(() => {
    if (!dataPoints.trim()) {
      setValidData([]);
      setError('');
      return;
    }

    // Procesar entrada y filtrar valores no válidos
    const processedData = dataPoints
      .split(',')
      .map(point => {
        const trimmed = point.trim();
        const num = Number(trimmed);
        return { value: trimmed, number: num, isValid: !isNaN(num) && trimmed !== '' };
      });

    const validNumbers = processedData.filter(item => item.isValid).map(item => item.number);
    setValidData(validNumbers);

    // Verificar errores
    const hasInvalidEntries = processedData.some(item => !item.isValid && item.value !== '');
    if (hasInvalidEntries) {
      setError('Algunos valores no son números válidos');
    } else {
      setError('');
    }
  }, [dataPoints]);

  // Calcular estadísticas básicas
  const calculateStatistics = (data) => {
    if (data.length === 0) return null;
    
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    
    // Evitar división por cero cuando hay un solo valor
    const variance = data.length > 1 
      ? data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (data.length - 1)
      : 0;
    
    const stdDev = Math.sqrt(variance);
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    return {
      mean: parseFloat(mean.toFixed(4)),
      stdDev: parseFloat(stdDev.toFixed(4)),
      sampleSize: data.length,
      min: parseFloat(min.toFixed(4)),
      max: parseFloat(max.toFixed(4))
    };
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (validData.length === 0) {
      setError('Por favor, ingrese al menos un número válido');
      return;
    }

    const stats = calculateStatistics(validData);
    setStatistics(stats);
    onDataReady(stats);
  };

  const handleClear = () => {
    setDataPoints('');
    setError('');
    setValidData([]);
    setStatistics(null);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setDataPoints(clipboardText);
    } catch (err) {
      // El navegador no permite el acceso al portapapeles
      console.error('No se pudo acceder al portapapeles:', err);
    }
  };

  const handleExample = () => {
    setDataPoints('10.5, 12.3, 8.7, 9.5, 11.2, 10.8');
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valores (separados por comas)
          </label>
          <div className="flex flex-col space-y-2">
            <textarea
              value={dataPoints}
              onChange={(e) => setDataPoints(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 12.5, 14.3, 11.9, 13.2"
              rows={3}
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
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
                onClick={handlePaste}
                className="text-blue-600 hover:text-blue-800"
              >
                Pegar del portapapeles
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-blue-600 hover:text-blue-800"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleSubmit}
            disabled={validData.length === 0}
            className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors shadow-md ${
              validData.length > 0 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Calcular Estadísticos {validData.length > 0 && `(${validData.length} valores)`}
          </button>
        </div>
      </div>

      {statistics && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Resultados:</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">Tamaño de muestra:</span> {statistics.sampleSize}</li>
            <li><span className="font-medium">Media:</span> {statistics.mean}</li>
            <li><span className="font-medium">Desviación estándar:</span> {statistics.stdDev}</li>
            <li><span className="font-medium">Mínimo:</span> {statistics.min}</li>
            <li><span className="font-medium">Máximo:</span> {statistics.max}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManualData;
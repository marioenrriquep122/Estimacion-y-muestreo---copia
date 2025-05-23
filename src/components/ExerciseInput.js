// ExerciseInput.jsx
import React, { useState, useEffect } from 'react';

const ExerciseInput = ({ onDataReady }) => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  // Procesar la cadena de texto
  useEffect(() => {
    if (!inputText.trim()) {
      setError('');
      setStats(null);
      return;
    }

    try {
      const params = {};

      // Extraer valores usando expresiones regulares
      const meanMatch = inputText.match(/duración promedio de (\d+\.?\d*)\s*horas/i);
      const stdDevMatch = inputText.match(/desviación\s*(?:estándar|entandar)\s*de\s*(\d+\.?\d*)\s*h/i);
      const sampleSizeMatch = inputText.match(/(?:muestra\s*de|empresa\s*de)\s*(\d+)\s*focos/i);

      if (meanMatch) {
        params.mean = parseFloat(meanMatch[1]);
      }
      if (stdDevMatch) {
        params.stdDev = parseFloat(stdDevMatch[1]);
      }
      if (sampleSizeMatch) {
        params.sampleSize = parseInt(sampleSizeMatch[1]);
      }

      // Validaciones
      if (!params.mean || !params.stdDev || !params.sampleSize) {
        throw new Error('No se encontraron todos los parámetros necesarios (media, stdDev, sampleSize)');
      }

      if (params.sampleSize < 2) {
        throw new Error('El tamaño de muestra debe ser al menos 2');
      }

      if (params.stdDev <= 0) {
        throw new Error('La desviación estándar debe ser mayor que 0');
      }

      setStats({
        mean: params.mean,
        stdDev: params.stdDev,
        sampleSize: params.sampleSize,
        generatedData: null, // No generamos datos, solo usamos los parámetros
      });
      setError('');
    } catch (err) {
      setError(err.message);
      setStats(null);
    }
  }, [inputText]);

  const handleSubmit = () => {
    if (stats) {
      onDataReady(stats);
    } else if (!error) {
      setError('Por favor, ingrese un texto válido');
    }
  };

  const handleClear = () => {
    setInputText('');
    setError('');
    setStats(null);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setInputText(clipboardText);
    } catch (err) {
      setError('No se pudo acceder al portapapeles');
    }
  };

  const handleExample = () => {
    setInputText('una empresa fabrica focos que tiene un tiempo de duración aproximadamente normal con desviación estándar de 40h, si una empresa de 30 focos tiene una duración promedio de 780 horas calcule e interprete un intervalo de confianza del 95% para la duración promedio de todos los focos que produce esta empresa');
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingrese el ejercicio en texto
          </label>
          <div className="flex flex-col space-y-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Escriba una ejercicio el cual le gustaria saber estimacion y muestreo por intervalos de confianza"
              rows={5}
            />
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
        
        <button
          onClick={handleSubmit}
          disabled={!stats}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors shadow-md ${
            stats
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Calcular Estadísticos
        </button>
      </div>

      {stats && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Parámetros extraídos:</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium ">Media:</span> {stats.mean}</li>
            <li><span className="font-medium">Desviación estándar:</span> {stats.stdDev}</li>
            <li><span className="font-medium">Tamaño de muestra:</span> {stats.sampleSize}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciseInput;
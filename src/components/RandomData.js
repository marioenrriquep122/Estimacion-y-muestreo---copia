import React, { useState, useEffect } from 'react';

const RandomData = ({ onDataReady }) => {
  const [sampleSize, setSampleSize] = useState(30);
  const [mean, setMean] = useState(50);
  const [stdDev, setStdDev] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewStats, setPreviewStats] = useState(null);
  const [distribution, setDistribution] = useState('normal'); // normal o uniforme

  // Validar parámetros
  useEffect(() => {
    const newErrors = {};
    
    if (sampleSize < 2) {
      newErrors.sampleSize = 'El tamaño mínimo debe ser 2';
    } else if (sampleSize > 10000) {
      newErrors.sampleSize = 'El tamaño máximo es 10,000';
    }
    
    if (stdDev <= 0) {
      newErrors.stdDev = 'La desviación estándar debe ser mayor que 0';
    }
    
    setErrors(newErrors);
    
    // Generar pequeña previsualización
    if (Object.keys(newErrors).length === 0) {
      const previewSize = Math.min(5, sampleSize);
      const previewData = generateRandomSample(previewSize, mean, stdDev, distribution);
      setPreviewStats({
        count: previewSize,
        values: previewData.map(val => val.toFixed(2)).join(', ')
      });
    } else {
      setPreviewStats(null);
    }
  }, [sampleSize, mean, stdDev, distribution]);

  // Función para generar datos aleatorios con la distribución seleccionada
  const generateRandomSample = (size, mu, sigma, dist) => {
    if (dist === 'uniform') {
      // Para distribución uniforme, aproximamos la desviación estándar
      // Recordemos que para una dist. uniforme en [a,b], σ = (b-a)/sqrt(12)
      // Despejando: b-a = σ*sqrt(12)
      const range = sigma * Math.sqrt(12);
      const min = mu - range/2;
      const max = mu + range/2;
      
      return Array.from({ length: size }, () => 
        min + Math.random() * (max - min)
      );
    } else {
      // Distribución normal (Box-Muller)
      return Array.from({ length: size }, () => {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        const normal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return mu + sigma * normal;
      });
    }
  };

  const generateData = () => {
    if (Object.keys(errors).length > 0) return;
    
    setIsGenerating(true);
    
    // Simulamos un pequeño retraso para muestras grandes
    setTimeout(() => {
      try {
        const data = generateRandomSample(sampleSize, mean, stdDev, distribution);
        
        // Calculamos estadísticas
        const generatedMean = data.reduce((a, b) => a + b, 0) / data.length;
        
        // Evitamos división por cero
        const generatedStdDev = data.length > 1 
          ? Math.sqrt(data.reduce((sq, n) => sq + Math.pow(n - generatedMean, 2), 0) / (data.length - 1))
          : 0;
        
        const min = Math.min(...data);
        const max = Math.max(...data);
        
        onDataReady({
          mean: parseFloat(generatedMean.toFixed(4)),
          stdDev: parseFloat(generatedStdDev.toFixed(4)),
          sampleSize: data.length,
          min: parseFloat(min.toFixed(4)),
          max: parseFloat(max.toFixed(4)),
          distribution: distribution,
          generatedData: data.map(val => parseFloat(val.toFixed(4)))
        });
        
        setIsGenerating(false);
      } catch (error) {
        console.error("Error al generar datos:", error);
        setIsGenerating(false);
      }
    }, sampleSize > 1000 ? 300 : 0);
  };
  
  const handleQuickSample = (size) => {
    setSampleSize(size);
    // Generamos automáticamente al seleccionar un tamaño rápido
    setTimeout(() => generateData(), 100);
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distribución
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={distribution === 'normal'}
                  onChange={() => setDistribution('normal')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Normal</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={distribution === 'uniform'}
                  onChange={() => setDistribution('uniform')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Uniforme</span>
              </label>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamaño rápido
            </label>
            <div className="flex flex-wrap gap-2">
              {[10, 30, 100, 500].map(size => (
                <button
                  key={size}
                  onClick={() => handleQuickSample(size)}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Tamaño de Muestra
            </label>
            <span className="text-xs text-gray-500">(2-10,000)</span>
          </div>
          <input
            type="number"
            min="2"
            max="10000"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value) || 2)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.sampleSize ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.sampleSize && (
            <p className="text-red-500 text-xs mt-1">{errors.sampleSize}</p>
          )}
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
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.stdDev ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.stdDev && (
            <p className="text-red-500 text-xs mt-1">{errors.stdDev}</p>
          )}
        </div>

        {previewStats && (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
            <p className="font-medium text-gray-700">Vista previa:</p>
            <p className="text-gray-600 truncate">{previewStats.values}...</p>
          </div>
        )}
        
        <button
          onClick={generateData}
          disabled={isGenerating || Object.keys(errors).length > 0}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 ${
            isGenerating || Object.keys(errors).length > 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </>
          ) : (
            <>
              Generar {sampleSize} Datos Aleatorios
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>

      <div className="text-xs text-gray-500 italic text-center">
        {distribution === 'normal' ? 
          'La distribución normal genera valores que siguen una curva de campana alrededor de la media.' :
          'La distribución uniforme genera valores con igual probabilidad dentro de un rango.'
        }
      </div>
    </div>
  );
};

export default RandomData;
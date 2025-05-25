export const regenerateDataWithNewParams = (originalData, newParams) => {
  const { mean, stdDev, sampleSize } = newParams;
  
  // Si el tamaño de muestra es el mismo, regenerar datos con nueva distribución
  if (sampleSize === originalData.length) {
    return generateNormalData(mean, stdDev, sampleSize);
  }
  
  // Si el tamaño cambió, generar completamente nuevos datos
  return generateNormalData(mean, stdDev, sampleSize);
};

export const generateNormalData = (mean, stdDev, size) => {
  const data = [];
  
  for (let i = 0; i < size; i++) {
    // Generar número aleatorio con distribución normal usando Box-Muller
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    
    // Escalar a la media y desviación estándar deseadas
    const value = mean + z * stdDev;
    data.push(Number(value.toFixed(4)));
  }
  
  return data;
};

export const calculateStatsFromData = (data) => {
  const n = data.length;
  const mean = data.reduce((sum, val) => sum + val, 0) / n;
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);
  
  return {
    mean: Number(mean.toFixed(4)),
    stdDev: Number(stdDev.toFixed(4)),
    sampleSize: n,
    generatedData: data
  };
};
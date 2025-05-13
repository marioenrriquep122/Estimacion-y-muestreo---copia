// Estadísticos z para niveles de confianza comunes
const Z_SCORES = {
  90: 1.645,
  95: 1.96,
  99: 2.576
};
//proporciona la logica  estimación por intervalos de confianza y la planificación del muestreo 
export const calculateConfidenceInterval = ({ mean, stdDev, sampleSize, confidenceLevel }) => {
  const zScore = Z_SCORES[confidenceLevel];
  if (!zScore) throw new Error('Nivel de confianza no soportado');

  const standardError = stdDev / Math.sqrt(sampleSize);
  const margin = zScore * standardError;
  
  return {
    lower: mean - margin,
    upper: mean + margin,
    margin
  };
};

export const determineSampleSize = ({ margin, stdDev, confidenceLevel }) => {
  const zScore = Z_SCORES[confidenceLevel];
  if (!zScore) throw new Error('Nivel de confianza no soportado');
  return Math.ceil(Math.pow((zScore * stdDev) / margin, 2));
};
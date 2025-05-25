import { CONFIDENCE_LEVELS, VALIDATION_MESSAGES, UI_CONFIG } from '../constants';
import { showValidationError, showCalculationError } from './alerts';


const validateInput = async (value, field, min, max) => {
  if (value === null || value === undefined || value === '') {
    await showValidationError(
      `Campo requerido: ${field}`,
      VALIDATION_MESSAGES.REQUIRED_FIELD
    );
    throw new Error(`${field}: ${VALIDATION_MESSAGES.REQUIRED_FIELD}`);
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    await showValidationError(
      `Valor inválido: ${field}`,
      VALIDATION_MESSAGES.INVALID_NUMBER
    );
    throw new Error(`${field}: ${VALIDATION_MESSAGES.INVALID_NUMBER}`);
  }
  
  if (min !== undefined && numValue < min) {
    await showValidationError(
      `Valor fuera de rango: ${field}`,
      `El valor debe ser mayor o igual a ${min}`
    );
    throw new Error(`${field}: debe ser mayor o igual a ${min}`);
  }
  
  if (max !== undefined && numValue > max) {
    await showValidationError(
      `Valor fuera de rango: ${field}`,
      `El valor debe ser menor o igual a ${max}`
    );
    throw new Error(`${field}: debe ser menor o igual a ${max}`);
  }
  
  return numValue;
};

// Validar parámetros de intervalo de confianza
const validateConfidenceParams = async ({ mean, stdDev, sampleSize, confidenceLevel }) => {
  try {
    const validatedMean = await validateInput(mean, 'Media', UI_CONFIG.MIN_MEAN, UI_CONFIG.MAX_MEAN);
    const validatedStdDev = await validateInput(stdDev, 'Desviación estándar', UI_CONFIG.MIN_STD_DEV, UI_CONFIG.MAX_STD_DEV);
    const validatedSampleSize = await validateInput(sampleSize, 'Tamaño de muestra', UI_CONFIG.MIN_SAMPLE_SIZE, UI_CONFIG.MAX_SAMPLE_SIZE);
    
    if (!CONFIDENCE_LEVELS[confidenceLevel]) {
      await showValidationError(
        'Nivel de confianza no válido',
        VALIDATION_MESSAGES.CONFIDENCE_NOT_SUPPORTED
      );
      throw new Error(VALIDATION_MESSAGES.CONFIDENCE_NOT_SUPPORTED);
    }
    
    return {
      mean: validatedMean,
      stdDev: validatedStdDev,
      sampleSize: validatedSampleSize,
      confidenceLevel
    };
  } catch (error) {
    throw error; 
  }
};

export const calculateConfidenceInterval = async (params) => {
  try {
    const { mean, stdDev, sampleSize, confidenceLevel } = await validateConfidenceParams(params);
    const zScore = CONFIDENCE_LEVELS[confidenceLevel];
    
    const standardError = stdDev / Math.sqrt(sampleSize);
    const margin = zScore * standardError;
    
    return {
      lower: mean - margin,
      upper: mean + margin,
      margin,
      standardError,
      zScore,
      confidenceLevel
    };
  } catch (error) {
    console.error('Error calculando intervalo de confianza:', error.message);
    
    if (!error.message.includes('VALIDATION_MESSAGES')) {
      await showCalculationError(
        'No se pudo calcular el intervalo de confianza. Verifica los datos ingresados.'
      );
    }
    
    throw error;
  }
};

export const determineSampleSize = async ({ margin, stdDev, confidenceLevel }) => {
  try {
    const validatedMargin = await validateInput(margin, 'Margen de error', 0.001, 1000);
    const validatedStdDev = await validateInput(stdDev, 'Desviación estándar', UI_CONFIG.MIN_STD_DEV, UI_CONFIG.MAX_STD_DEV);
    
    if (!CONFIDENCE_LEVELS[confidenceLevel]) {
      await showValidationError(
        'Nivel de confianza no válido',
        VALIDATION_MESSAGES.CONFIDENCE_NOT_SUPPORTED
      );
      throw new Error(VALIDATION_MESSAGES.CONFIDENCE_NOT_SUPPORTED);
    }
    
    const zScore = CONFIDENCE_LEVELS[confidenceLevel];
    const sampleSize = Math.ceil(Math.pow((zScore * validatedStdDev) / validatedMargin, 2));
    
    return {
      sampleSize,
      zScore,
      margin: validatedMargin,
      stdDev: validatedStdDev,
      confidenceLevel
    };
  } catch (error) {
    console.error('Error calculando tamaño de muestra:', error.message);
    
    if (!error.message.includes('VALIDATION_MESSAGES')) {
      await showCalculationError(
        'No se pudo calcular el tamaño de muestra. Verifica los datos ingresados.'
      );
    }
    
    throw error;
  }
};

export const calculateTwoPopulationInterval = async ({ pop1, pop2, confidenceLevel = 95 }) => {
  try {
    const validatedPop1 = await validateConfidenceParams({
      mean: pop1.mean,
      stdDev: pop1.stdDev,
      sampleSize: pop1.sampleSize,
      confidenceLevel
    });
    
    const validatedPop2 = await validateConfidenceParams({
      mean: pop2.mean,
      stdDev: pop2.stdDev,
      sampleSize: pop2.sampleSize,
      confidenceLevel
    });
    
    const diffMean = validatedPop1.mean - validatedPop2.mean;
    const stdError = Math.sqrt(
      (Math.pow(validatedPop1.stdDev, 2) / validatedPop1.sampleSize) + 
      (Math.pow(validatedPop2.stdDev, 2) / validatedPop2.sampleSize)
    );
    
    const zScore = CONFIDENCE_LEVELS[confidenceLevel];
    const margin = zScore * stdError;
    
    return {
      lower: diffMean - margin,
      upper: diffMean + margin,
      margin,
      standardError: stdError,
      diffMean,
      zScore,
      confidenceLevel
    };
  } catch (error) {
    console.error('Error calculando intervalo para dos poblaciones:', error.message);
    
    if (!error.message.includes('VALIDATION_MESSAGES')) {
      await showCalculationError(
        'No se pudo calcular el intervalo para dos poblaciones. Verifica los datos ingresados.'
      );
    }
    
    throw error;
  }
};
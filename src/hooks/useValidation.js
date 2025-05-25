import { useState, useEffect, useMemo, useCallback } from 'react';
import { VALIDATION_MESSAGES, UI_CONFIG } from '../constants';

export const useValidation = (values, validationRules) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Memoizar las reglas de validación para evitar recreaciones innecesarias
  const memoizedRules = useMemo(() => validationRules, [
    JSON.stringify(validationRules)
  ]);

  // Memoizar los valores para evitar comparaciones innecesarias
  const memoizedValues = useMemo(() => values, [
    JSON.stringify(values)
  ]);

  // Función de validación memoizada
  const validateField = useCallback((value, fieldName, rule) => {
    // Campo requerido
    if (rule.required && (value === '' || value === null || value === undefined)) {
      return VALIDATION_MESSAGES.REQUIRED_FIELD;
    }
    
    // Si el campo está vacío y no es requerido, saltar validación
    if (!value && !rule.required) return null;
    
    const numValue = Number(value);
    
    // Validar que sea número
    if (rule.type === 'number' && isNaN(numValue)) {
      return VALIDATION_MESSAGES.INVALID_NUMBER;
    }
    
    // Validar rango mínimo
    if (rule.min !== undefined && numValue < rule.min) {
      return rule.minMessage || `Valor mínimo: ${rule.min}`;
    }
    
    // Validar rango máximo
    if (rule.max !== undefined && numValue > rule.max) {
      return rule.maxMessage || `Valor máximo: ${rule.max}`;
    }
    
    // Validaciones personalizadas
    if (rule.custom && !rule.custom(numValue)) {
      return rule.customMessage || 'Valor inválido';
    }
    
    return null;
  }, []);

  // Función principal de validación
  const validate = useCallback(() => {
    const newErrors = {};
    
    Object.keys(memoizedRules).forEach(field => {
      const rule = memoizedRules[field];
      const value = memoizedValues[field];
      
      const error = validateField(value, field, rule);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    return newErrors;
  }, [memoizedValues, memoizedRules, validateField]);

  // Effect para ejecutar validación
  useEffect(() => {
    // Solo validar si hay reglas y valores
    if (Object.keys(memoizedRules).length === 0) {
      setErrors({});
      setIsValid(true);
      return;
    }

    const newErrors = validate();
    const newIsValid = Object.keys(newErrors).length === 0;
    
    // Solo actualizar estado si realmente cambió
    setErrors(prevErrors => {
      if (JSON.stringify(prevErrors) !== JSON.stringify(newErrors)) {
        return newErrors;
      }
      return prevErrors;
    });
    
    setIsValid(prevIsValid => {
      if (prevIsValid !== newIsValid) {
        return newIsValid;
      }
      return prevIsValid;
    });
  }, [validate]);

  // Función para limpiar errores manualmente
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Función para establecer un error específico
  const setFieldError = useCallback((field, message) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  }, []);

  return { 
    errors, 
    isValid, 
    clearErrors, 
    setFieldError,
    validate: useCallback(() => validate(), [validate])
  };
};

// Reglas de validación predefinidas para campos estadísticos
export const STATS_VALIDATION_RULES = {
  mean: {
    required: true,
    type: 'number',
    min: UI_CONFIG.MIN_MEAN,
    max: UI_CONFIG.MAX_MEAN,
    minMessage: VALIDATION_MESSAGES.INVALID_MEAN,
    maxMessage: VALIDATION_MESSAGES.INVALID_MEAN
  },
  stdDev: {
    required: true,
    type: 'number',
    min: UI_CONFIG.MIN_STD_DEV,
    max: UI_CONFIG.MAX_STD_DEV,
    minMessage: VALIDATION_MESSAGES.POSITIVE_STD_DEV,
    maxMessage: VALIDATION_MESSAGES.POSITIVE_STD_DEV
  },
  sampleSize: {
    required: true,
    type: 'number',
    min: UI_CONFIG.MIN_SAMPLE_SIZE,
    max: UI_CONFIG.MAX_SAMPLE_SIZE,
    minMessage: VALIDATION_MESSAGES.MIN_SAMPLE_SIZE,
    maxMessage: VALIDATION_MESSAGES.MAX_SAMPLE_SIZE,
    custom: (value) => Number.isInteger(value),
    customMessage: 'El tamaño de muestra debe ser un número entero'
  }
};
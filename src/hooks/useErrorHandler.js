import { useCallback } from 'react';
import { showValidationError, showCalculationError, showTechnicalError } from '../utils/alerts';

export const useErrorHandler = () => {
  const handleError = useCallback(async (error, context = 'general') => {
    console.error(`Error en ${context}:`, error);
    
    // Errores de validación
    if (error.message.includes('VALIDATION_MESSAGES') || 
        error.message.includes('requerido') || 
        error.message.includes('inválido')) {
      await showValidationError('Error de Validación', error.message);
      return;
    }
    
    // Errores de cálculo
    if (error.message.includes('cálculo') || 
        error.message.includes('intervalo') || 
        error.message.includes('muestra')) {
      await showCalculationError(error.message);
      return;
    }
    
    // Errores técnicos/inesperados
    await showTechnicalError(
      'Error Inesperado',
      'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
      error.stack || error.message
    );
  }, []);

  return { handleError };
};
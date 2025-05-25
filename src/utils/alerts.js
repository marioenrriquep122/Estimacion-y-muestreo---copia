import Swal from 'sweetalert2';

// Configuración base para todas las alertas
const baseConfig = {
  customClass: {
    popup: 'rounded-lg shadow-xl',
    title: 'text-xl font-bold text-gray-800',
    content: 'text-gray-600',
    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors',
    cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'
  },
  buttonsStyling: false
};

// Alerta de error de validación
export const showValidationError = (title, message) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'error',
    title: title || 'Error de Validación',
    text: message,
    confirmButtonText: 'Entendido',
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      ...baseConfig.customClass,
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
    }
  });
};

// Alerta de error de cálculo
export const showCalculationError = (message) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'error',
    title: 'Error en Cálculo',
    text: message,
    confirmButtonText: 'Revisar datos',
    footer: '<small>Verifica que todos los valores sean correctos</small>',
    customClass: {
      ...baseConfig.customClass,
      confirmButton: 'bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
    }
  });
};

// Alerta de éxito
export const showSuccess = (title, message) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'success',
    title: title || '¡Éxito!',
    text: message,
    confirmButtonText: 'Continuar',
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      ...baseConfig.customClass,
      confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
    }
  });
};

// Alerta de confirmación
export const showConfirmation = (title, message, confirmText = 'Sí, continuar') => {
  return Swal.fire({
    ...baseConfig,
    icon: 'question',
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
  });
};

// Alerta de información
export const showInfo = (title, message) => {
  return Swal.fire({
    ...baseConfig,
    icon: 'info',
    title: title,
    text: message,
    confirmButtonText: 'Entendido'
  });
};

// Alerta con detalles técnicos (para desarrollo)
export const showTechnicalError = (title, message, details) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return Swal.fire({
    ...baseConfig,
    icon: 'error',
    title: title,
    text: message,
    html: isDevelopment ? `
      <p class="text-gray-600 mb-4">${message}</p>
      <details class="text-left">
        <summary class="cursor-pointer font-medium text-gray-700 mb-2">Ver detalles técnicos</summary>
        <pre class="bg-gray-100 p-3 rounded text-xs text-gray-800 overflow-auto max-h-32">${details}</pre>
      </details>
    ` : message,
    confirmButtonText: 'Entendido',
    customClass: {
      ...baseConfig.customClass,
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
    }
  });
};
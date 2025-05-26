// Niveles de confianza y estadísticos z
export const CONFIDENCE_LEVELS = {
  90: 1.645,
  95: 1.96,
  99: 2.576
};

// Configuración de la interfaz
export const UI_CONFIG = {
  BACKGROUND_IMAGE_URL: "https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0om3zHsOgDjdvqUQH6XhKYIiaSc3LCtrM1fen",
  DEFAULT_CONFIDENCE_LEVEL: 95,
  MAX_SAMPLE_SIZE: 10000,
  MIN_SAMPLE_SIZE: 2,
  MAX_STD_DEV: 1000000,
  MIN_STD_DEV: 0.001,
  MAX_MEAN: 10000000,
  MIN_MEAN: -100000
};

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es obligatorio',
  MIN_SAMPLE_SIZE: `El tamaño mínimo de muestra debe ser ${UI_CONFIG.MIN_SAMPLE_SIZE}`,
  MAX_SAMPLE_SIZE: `El tamaño máximo de muestra es ${UI_CONFIG.MAX_SAMPLE_SIZE}`,
  POSITIVE_STD_DEV: `La desviación estándar debe estar entre ${UI_CONFIG.MIN_STD_DEV} y ${UI_CONFIG.MAX_STD_DEV}`,
  INVALID_MEAN: `La media debe estar entre ${UI_CONFIG.MIN_MEAN} y ${UI_CONFIG.MAX_MEAN}`,
  INVALID_NUMBER: 'Debe ser un número válido',
  CONFIDENCE_NOT_SUPPORTED: 'Nivel de confianza no soportado'
};

// Tipos de datos
export const DATA_TYPES = {
  SINGLE_POPULATION: 'singlePopulation',
  TWO_POPULATIONS: 'twoPopulations',
  GENERATED: 'generated'
};
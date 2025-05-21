import React, { useState } from 'react';

// Panel de información mejorado visualmente manteniendo la funcionalidad original
const InfoPanel = () => {
  // Estado para manejar la expansión/colapso de cada FAQ
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  // Mismos datos originales
  const faqs = [
    {
      question: "¿Qué es un intervalo de confianza?",
      answer: "Es un rango de valores que probablemente contiene el parámetro poblacional desconocido, con un cierto grado de confianza."
    },
    {
      question: "¿Por qué usar 95% de confianza?",
      answer: "Es un estándar común que ofrece un balance entre precisión y certeza. Puedes elegir otros niveles según tus necesidades."
    },
    {
      question: "¿Cómo influye el tamaño muestral?",
      answer: "A mayor tamaño muestral, menor será el margen de error y más estrecho el intervalo de confianza."
    }
  ];

  // Función para manejar el clic en una FAQ
  const toggleExpanded = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 mt-6 border border-blue-100">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Conceptos Clave</h2>
      </div>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl shadow-sm transition-all duration-300 ${
              expandedIndex === index ? 'ring-2 ring-blue-300' : 'hover:shadow-md'
            }`}
          >
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpanded(index)}
            >
              <h3 className="font-semibold text-gray-800 flex items-center">
                <span className="text-blue-500 mr-2">{index + 1}.</span>
                {faq.question}
              </h3>
              <span className={`text-blue-500 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                expandedIndex === index ? 'max-h-32' : 'max-h-0'
              }`}
            >
              <div className="p-4 pt-0 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                
                {/* Iconos visuales específicos para cada concepto */}
                <div className="mt-3 flex justify-center">
                  {index === 0 && (
                    <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center">
                      <div className="w-16 h-4 bg-blue-200 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-1/4 right-1/4 bottom-0 bg-blue-500"></div>
                      </div>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center space-x-2">
                      <span className="text-blue-800 text-xs font-medium">90%</span>
                      <span className="text-blue-500 text-xs font-medium">95%</span>
                      <span className="text-blue-300 text-xs font-medium">99%</span>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center space-x-3">
                      <div className="w-2 h-4 bg-blue-300 rounded"></div>
                      <div className="w-4 h-4 bg-blue-400 rounded"></div>
                      <div className="w-6 h-4 bg-blue-500 rounded"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Nota adicional */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-blue-700">Estos conceptos son fundamentales para comprender la estadística inferencial y aplicarla correctamente en el análisis de datos.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
import React from 'react';
// esta es la vista de informacion donde damos una informacion relevante para que el usuario entienda y comprenda de mejor forma
const InfoPanel = () => {
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Conceptos Clave</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 pb-4">
            <h3 className="font-semibold text-gray-800">{faq.question}</h3>
            <p className="text-gray-600 mt-1 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoPanel;
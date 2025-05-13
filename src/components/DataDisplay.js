import React from 'react';
//este es la vista donde los datos se generaron actomaticamente
const DataDisplay = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Datos Generados Aleatoriamente</h2>
      <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-60">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {data.map((value, index) => (
            <div key={index} className="bg-white p-2 rounded border border-gray-200 text-center">
              <span className="text-sm font-medium text-gray-700">{value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        Total: {data.length} valores generados
      </div>
    </div>
  );
};

export default DataDisplay;
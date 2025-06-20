// App.jsx
import React, { useState, useMemo, useCallback } from "react";
import Principal from "./components/Principal";
import SeleccionDeDatos from "./components/SeleccionDeDatos";
import Calculos from "./components/Calculos";
import GraficaDeIntervalos from "./components/GraficaDeIntervalos";
import InfoPanel from "./components/InfoPanel";
import DataDisplay from "./components/DataDisplay";
import ErrorBoundary from "./components/ErrorBoundary";
import { UI_CONFIG, CONFIDENCE_LEVELS } from "./constants";
import { regenerateDataWithNewParams, calculateStatsFromData } from "./utils/dataGeneration";

const App = () => {
  const [userName, setUserName] = useState("");
  const [isDataReady, setIsDataReady] = useState(false);
  const [stats, setStats] = useState(null);
  const [showNameForm, setShowNameForm] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(null);

  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url('${UI_CONFIG.BACKGROUND_IMAGE_URL}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  }), []);

  const handleIntervalCalculated = useCallback((interval) => {
    setCurrentInterval(interval);
  }, []);

  const confidenceInterval = useMemo(() => {
    if (currentInterval) {
      return currentInterval;
    }
    
    if (!stats) return null;
    
    try {
      if (stats.type === 'twoPopulations') {
        const diffMean = stats.pop1.mean - stats.pop2.mean;
        const stdError = Math.sqrt(
          (Math.pow(stats.pop1.stdDev, 2) / stats.pop1.sampleSize) + 
          (Math.pow(stats.pop2.stdDev, 2) / stats.pop2.sampleSize)
        );
        const z = CONFIDENCE_LEVELS[UI_CONFIG.DEFAULT_CONFIDENCE_LEVEL];
        const margin = z * stdError;
        return {
          lower: diffMean - margin,
          upper: diffMean + margin,
          margin,
          type: 'twoPopulations'
        };
      }
      
      const { mean, stdDev, sampleSize } = stats;
      const standardError = stdDev / Math.sqrt(sampleSize);
      const z = CONFIDENCE_LEVELS[UI_CONFIG.DEFAULT_CONFIDENCE_LEVEL];
      
      return {
        lower: mean - z * standardError,
        upper: mean + z * standardError,
      };
    } catch (error) {
      console.error('Error calculando intervalo de confianza:', error);
      return null;
    }
  }, [stats, currentInterval]);

  const onDataReady = useCallback((data) => {
    if (
      data &&
      ((typeof data.mean === "number" && typeof data.stdDev === "number" && data.sampleSize > 0) ||
       (data.type === 'twoPopulations' && data.pop1 && data.pop2))
    ) {
      setStats(data);
      setIsDataReady(true);
    }
  }, []);

  const onResetData = useCallback(() => {
    setIsDataReady(false);
    setStats(null);
  }, []);

  const onChangeName = useCallback(() => {
    setShowNameForm(true);
  }, []);

  const onNameSubmit = useCallback((name) => {
    const trimmed = name.trim();
    if (trimmed) {
      setUserName(trimmed);
      setShowNameForm(false);
      localStorage.setItem("userName", trimmed);
    }
  }, []);

  const onResetApp = useCallback(() => {
    setUserName("");
    setIsDataReady(false);
    setStats(null);
    localStorage.removeItem("userName");
  }, []);

  if (showNameForm || !userName) {
    return <Principal onNameSubmit={onNameSubmit} initialName={userName} />;
  }

  if (!isDataReady) {
    return (
      <div className="min-h-screen bg-gray-50" style={backgroundStyle}>
        <SeleccionDeDatos
          userName={userName}
          onDataReady={onDataReady}
          onBack={onChangeName}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50" style={backgroundStyle}>
        <div className="max-w-4xl mx-auto py-8 px-4">
          <header className="mb-8 bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 font-serif">
                  Intervalos De ConfianzaPro
                </h1>
                <p className="text-gray-600 mt-1">
                  Usuario:{" "}
                  <span className="font-medium text-blue-600">{userName}</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onChangeName}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors shadow-md"
                >
                  Cambiar usuario
                </button>
                <button
                  onClick={onResetApp}
                  className="text-sm bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors shadow-md"
                >
                  Reiniciar todo
                </button>
              </div>
            </div>
          </header>

          <main className="space-y-6">
            {stats?.generatedData && <DataDisplay data={stats.generatedData} />}

            <Calculos
              initialMean={stats?.mean || 0}
              initialStdDev={stats?.stdDev || 0}
              initialSampleSize={stats?.sampleSize || 0}
              isAutoGenerated={!!stats?.generatedData}
              pop1={stats?.type === 'twoPopulations' ? stats.pop1 : null}
              pop2={stats?.type === 'twoPopulations' ? stats.pop2 : null}
              onIntervalCalculated={handleIntervalCalculated}
            />

            {confidenceInterval && (
              <GraficaDeIntervalos 
                interval={confidenceInterval} 
                key={`${confidenceInterval.lower}-${confidenceInterval.upper}-${confidenceInterval.confidenceLevel || 95}-${Date.now()}`}
              />
            )}

            <InfoPanel />

            <div className="flex gap-4 justify-center">
              <button
                onClick={onResetData}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md flex items-center gap-2"
                aria-label="Iniciar nueva prueba"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Nueva prueba
              </button>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
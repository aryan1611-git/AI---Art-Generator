import React, { useState, useEffect } from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Generating your masterpiece...' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const steps = [
    "Connecting to AI service...",
    "Processing your prompt...",
    "Generating initial concepts...",
    "Refining the composition...",
    "Adding artistic details...",
    "Applying selected style...",
    "Finalizing your artwork..."
  ];
  
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    
    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    
    return () => {
      clearInterval(stepInterval);
      clearInterval(timeInterval);
    };
  }, [steps.length]);

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="mb-6 relative">
        <div className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700 border-t-purple-600 dark:border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-transparent border-r-teal-500 dark:border-r-teal-400 rounded-full animate-[spin_2s_linear_infinite]"></div>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        {message}
      </h3>
      
      <div className="w-full max-w-md space-y-3 mb-6">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center transition-all duration-300 ${
              index === currentStep ? 'scale-105' : 'scale-100'
            }`}
          >
            <div 
              className={`h-2 w-2 rounded-full mr-3 transition-colors duration-300 ${
                index === currentStep
                  ? 'bg-purple-600 dark:bg-purple-500 animate-pulse'
                  : index < currentStep
                  ? 'bg-green-500 dark:bg-green-400'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
            ></div>
            <span 
              className={`text-sm transition-colors duration-300 ${
                index === currentStep
                  ? 'text-gray-800 dark:text-white font-medium'
                  : index < currentStep
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      
      <div className="text-sm text-center text-gray-500 dark:text-gray-400">
        <p>Time elapsed: {elapsedTime} seconds</p>
        <p className="mt-4">AI is creating your unique artwork. This typically takes 15-30 seconds.</p>
        <p className="mt-2 italic">Please wait while we perfect every detail!</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
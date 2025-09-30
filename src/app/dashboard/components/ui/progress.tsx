'use client';

import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const Progress: React.FC<ProgressProps> = ({ 
  value, 
  className = '', 
  showPercentage = false,
  color = 'blue'
}) => {
  const progressValue = Math.min(100, Math.max(0, value));

  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-400',
    purple: 'bg-purple-500',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div 
        className={`${colorMap[color]} h-full transition-all duration-500 ease-out`}
        style={{ width: `${progressValue}%` }}
        role="progressbar"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {showPercentage && (
          <span className="text-xs text-white px-2 flex justify-center">
            {progressValue}%
          </span>
        )}
      </div>
    </div>
  );
};

export default Progress;
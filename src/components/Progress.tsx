import React from 'react';

interface ProgressProps {
  percentage: number;
  trailColor?: string;
  strokeColor?: string;
  heigh?: number;
}

function Progress({
  percentage = 0,
  trailColor = 'bg-blue-600',
  strokeColor = 'bg-gray-200',
  heigh = 2.5,
}: ProgressProps) {
  return (
    <div className={`w-full ${strokeColor} rounded-full h-${heigh}`}>
      <div className={`${trailColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export default Progress;

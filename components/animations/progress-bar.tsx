// components/ProgressBar.tsx
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  duration: number;
  className?: string; // Optional className prop
}

export default function ProgressBar({ duration, className }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0); // Reset progress to 0
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);
      if (percentage >= 100) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className={`relative w-full h-1 bg-gray-200 ${className}`} // Apply className here
    >
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
        style={{
          width: `${progress}%`,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}

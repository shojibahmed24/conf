import React, { useState, useCallback } from 'react';
import { RotateCcw, Fingerprint } from 'lucide-react';

export const Tasbih: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);

  const handleIncrement = useCallback(() => {
    // Simulate Haptic Feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setCount(prev => {
      const next = prev + 1;
      if (next === target) {
        if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
      }
      return next;
    });
  }, [target]);

  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-emerald-100">
      <div className="text-sm font-medium text-emerald-600 mb-2 uppercase tracking-wider">
        Tasbih Counter
      </div>
      
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="#ecfdf5"
            strokeWidth="8"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - (count % target) / target)}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <span className="text-6xl font-bold text-zinc-900">{count}</span>
      </div>

      <div className="flex gap-4 w-full">
        <button
          onClick={reset}
          className="p-4 rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
        
        <button
          onClick={handleIncrement}
          className="flex-1 py-4 bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Fingerprint size={24} />
          Tap to Count
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        {[33, 99, 100].map(val => (
          <button
            key={val}
            onClick={() => setTarget(val)}
            className={`px-4 py-1 rounded-full text-xs font-medium transition-colors ${
              target === val ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-50 text-zinc-400'
            }`}
          >
            Target: {val}
          </button>
        ))}
      </div>
    </div>
  );
};
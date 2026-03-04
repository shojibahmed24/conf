import React from 'react';
import { Home, Book, Fingerprint, Clock } from 'lucide-react';

type View = 'home' | 'quran' | 'tasbih' | 'prayer';

interface BottomNavProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'quran', icon: Book, label: 'Quran' },
    { id: 'tasbih', icon: Fingerprint, label: 'Tasbih' },
    { id: 'prayer', icon: Clock, label: 'Prayer' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-3 flex justify-between items-center z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id as View)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeView === item.id ? 'text-emerald-600' : 'text-zinc-400'
          }`}
        >
          <item.icon size={24} strokeWidth={activeView === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
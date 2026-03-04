import React, { useState, useEffect } from 'react';
import { Tasbih } from './components/Tasbih';
import { PrayerCard } from './components/PrayerCard';
import { BottomNav } from './components/BottomNav';
import { Book, Clock, Fingerprint, Home } from 'lucide-react';

type View = 'home' | 'quran' | 'tasbih' | 'prayer';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');

  return (
    <div className="min-h-screen pb-24">
      <header className="p-6 bg-white border-b border-emerald-50 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-600">Noor Deen</h1>
            <p className="text-xs text-zinc-500">Assalamu Alaikum</p>
          </div>
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <Home size={20} />
          </div>
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {activeView === 'home' && (
          <div className="space-y-6">
            <PrayerCard />
            <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-100">
              <h3 className="text-lg font-semibold mb-2">Daily Hadith</h3>
              <p className="text-emerald-50 text-sm italic">
                "The best among you are those who learn the Quran and teach it."
              </p>
              <p className="text-xs mt-4 opacity-70">— Sahih Bukhari</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <QuickAction icon={<Book />} label="Quran" onClick={() => setActiveView('quran')} />
              <QuickAction icon={<Fingerprint />} label="Tasbih" onClick={() => setActiveView('tasbih')} />
            </div>
          </div>
        )}

        {activeView === 'tasbih' && <Tasbih />}

        {activeView === 'prayer' && <PrayerCard expanded />}

        {activeView === 'quran' && (
          <div className="text-center py-20 text-zinc-400">
            <Book size={48} className="mx-auto mb-4 opacity-20" />
            <p>Quran Reader coming soon...</p>
          </div>
        )}
      </main>

      <BottomNav activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
};

const QuickAction = ({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl border border-emerald-50 flex flex-col items-center gap-3 shadow-sm active:scale-95 transition-transform"
  >
    <div className="text-emerald-500">{icon}</div>
    <span className="font-medium text-zinc-700">{label}</span>
  </button>
);

export default App;
import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { PrayerService, PrayerTimes } from '../services/prayerService';

export const PrayerCard: React.FC<{ expanded?: boolean }> = ({ expanded }) => {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [next, setNext] = useState<{ name: string; time: string } | null>(null);

  useEffect(() => {
    const fetchTimes = async () => {
      const data = await PrayerService.getTimes('Dhaka');
      setTimes(data);
      setNext(PrayerService.getNextPrayer(data));
    };
    fetchTimes();
  }, []);

  if (!times || !next) return null;

  if (expanded) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-emerald-50 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-900">Prayer Times</h2>
          <div className="flex items-center gap-1 text-emerald-600 text-sm">
            <MapPin size={14} />
            <span>Dhaka</span>
          </div>
        </div>
        <div className="space-y-4">
          {Object.entries(times).map(([name, time]) => (
            <div 
              key={name} 
              className={`flex justify-between items-center p-3 rounded-xl ${
                next.name.toLowerCase() === name ? 'bg-emerald-50 border border-emerald-100' : ''
              }`}
            >
              <span className="capitalize font-medium text-zinc-700">{name}</span>
              <span className={`font-bold ${next.name.toLowerCase() === name ? 'text-emerald-600' : 'text-zinc-900'}`}>
                {time}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-50 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
          <Clock size={24} />
        </div>
        <div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Next Prayer</div>
          <div className="text-lg font-bold text-zinc-900">{next.name} at {next.time}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-emerald-600 font-medium">Dhaka, BD</div>
      </div>
    </div>
  );
};
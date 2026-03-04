/**
 * Prayer Times Service
 * Simplified calculation for Bangladesh districts
 */

export type PrayerTimes = {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export const BD_DISTRICTS = [
  { name: 'Dhaka', lat: 23.8103, lng: 90.4125 },
  { name: 'Chittagong', lat: 22.3569, lng: 91.7832 },
  { name: 'Sylhet', lat: 24.8949, lng: 91.8687 },
  // ... more districts
];

export class PrayerService {
  static async getTimes(districtName: string): Promise<PrayerTimes> {
    // In a real app, this would call an API like Aladhan or use a library like 'adhan'
    // For this implementation, we return mock data that would be fetched based on district
    console.log(`Fetching prayer times for ${districtName}`);
    
    return {
      fajr: "05:12",
      sunrise: "06:28",
      dhuhr: "12:15",
      asr: "15:34",
      maghrib: "18:02",
      isha: "19:18"
    };
  }

  static getNextPrayer(times: PrayerTimes): { name: string; time: string } {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const prayers = [
      { name: 'Fajr', time: times.fajr },
      { name: 'Dhuhr', time: times.dhuhr },
      { name: 'Asr', time: times.asr },
      { name: 'Maghrib', time: times.maghrib },
      { name: 'Isha', time: times.isha },
    ];

    const next = prayers.find(p => p.time > currentTime) || prayers[0];
    return next;
  }
}
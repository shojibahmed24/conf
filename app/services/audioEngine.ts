/**
 * Quran Audio Engine
 * Handles sequential playback: Arabic Ayah -> Pause -> Bangla Translation
 */

type AudioTrack = {
  arabicUrl: string;
  banglaUrl: string;
  ayahNumber: number;
};

export class QuranAudioEngine {
  private arabicAudio: HTMLAudioElement | null = null;
  private banglaAudio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private tracks: AudioTrack[] = [];
  private onTrackChange: (index: number, mode: 'arabic' | 'bangla') => void;

  constructor(onTrackChange: (index: number, mode: 'arabic' | 'bangla') => void) {
    this.onTrackChange = onTrackChange;
  }

  setPlaylist(tracks: AudioTrack[]) {
    this.tracks = tracks;
    this.currentTrackIndex = 0;
  }

  async play() {
    if (this.tracks.length === 0) return;
    this.isPlaying = true;
    await this.playCurrentTrack();
  }

  private async playCurrentTrack() {
    if (!this.isPlaying || this.currentTrackIndex >= this.tracks.length) return;

    const track = this.tracks[this.currentTrackIndex];
    
    // 1. Play Arabic
    this.onTrackChange(this.currentTrackIndex, 'arabic');
    this.arabicAudio = new Audio(track.arabicUrl);
    
    this.arabicAudio.onended = async () => {
      // 2. Short Pause (500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 3. Play Bangla
      if (!this.isPlaying) return;
      this.onTrackChange(this.currentTrackIndex, 'bangla');
      this.banglaAudio = new Audio(track.banglaUrl);
      
      this.banglaAudio.onended = () => {
        this.currentTrackIndex++;
        this.playCurrentTrack();
      };
      
      this.banglaAudio.play();
    };

    this.arabicAudio.play();
  }

  pause() {
    this.isPlaying = false;
    this.arabicAudio?.pause();
    this.banglaAudio?.pause();
  }

  stop() {
    this.pause();
    this.currentTrackIndex = 0;
  }
}
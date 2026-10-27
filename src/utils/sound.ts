/**
 * Web Audio API synthesized nostalgic sound effects for retro CRT experience.
 * Fully self-contained: no external audio assets that could fail to load or be blocked.
 */

class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private volume: number = 0.25;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Vintage mechanical keyboard key-press click
   */
  public playKeyClick(toneVariant: number = 0) {
    if (!this.soundEnabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // High-pitched click component
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const baseFreq = 950 + (toneVariant % 7) * 45;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.025);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);

      // Thud component (mechanical spring bottom-out)
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(140, now);
      thud.frequency.exponentialRampToValueAtTime(40, now + 0.02);

      thudGain.gain.setValueAtTime(0.05 * this.volume, now);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      thud.connect(thudGain);
      thudGain.connect(ctx.destination);

      thud.start(now);
      thud.stop(now + 0.03);
    } catch {
      // AudioContext muted/unpermitted
    }
  }

  /**
   * Terminal command beep / affirmative short chirp
   */
  public playChirp(freq = 880, duration = 0.045) {
    if (!this.soundEnabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.06 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {}
  }

  /**
   * Success sequence (two ascending vintage PC beeps)
   */
  public playSuccess() {
    if (!this.soundEnabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [587.33, 880, 1174.66]; // D5, A5, D6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.07;
        const dur = 0.06;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.08 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur + 0.01);
      });
    } catch {}
  }

  /**
   * Low vintage PC speaker error buzz
   */
  public playError() {
    if (!this.soundEnabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.18);

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  /**
   * Floppy disk drive seek sound on tab navigation
   */
  public playFloppySeek() {
    if (!this.soundEnabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const stepCount = 4;
      for (let i = 0; i < stepCount; i++) {
        const stepTime = now + i * 0.035;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320 + (i % 2) * 120, stepTime);

        gain.gain.setValueAtTime(0.04 * this.volume, stepTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.015);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(stepTime);
        osc.stop(stepTime + 0.02);
      }
    } catch {}
  }

  /**
   * CRT monitor degaussing sound effect (low frequency sweep with coil decay)
   */
  public playDegauss() {
    if (!this.soundEnabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.45);

      gain.gain.setValueAtTime(0.2 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.48);
    } catch {}
  }

  /**
   * Packet transmission chirp sequence
   */
  public playTransmission() {
    if (!this.soundEnabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [1046, 1318, 1567, 2093];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.07 * this.volume, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.04);
      });
    } catch {}
  }
}

export const sound = new RetroSoundEngine();

/**
 * Web Audio API procedural synthesis for the Black Hole Event Horizon Hum.
 * 
 * Synthesizes a soft, organic, low-frequency gravitational drone:
 * - Fundamental sub-bass sine at 49.0 Hz
 * - Detuned secondary wave at 52.8 Hz (producing a natural 3.8 Hz gravitational beat)
 * - Deep sub-harmonic at 24.5 Hz (tactile cosmic mass presence)
 * - Infrasonic LFO (0.07 Hz) gently sweeping the resonant low-pass filter (simulating plasma tidal breathing)
 * - Smooth exponential fade-ins/fade-outs with click-free gain scheduling
 */

export class EventHorizonAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;

  private isStarted = false;
  private isMuted = false;
  private baseVolume = 0.055; // Soft, unobtrusive ambient volume
  private userVolume = 1.0;
  private isHoverSwell = false;
  private onStateChangeCallbacks: Set<(state: AudioEngineState) => void> = new Set();

  constructor() {
    // Check if user previously muted sound in this session
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('swid_blackhole_audio_muted');
        if (saved === 'true') {
          this.isMuted = true;
        }
      } catch {
        // Ignore storage errors
      }
    }
  }

  public getState(): AudioEngineState {
    return {
      isStarted: this.isStarted,
      isMuted: this.isMuted,
      volume: this.userVolume,
      isHoverSwell: this.isHoverSwell,
    };
  }

  public subscribe(cb: (state: AudioEngineState) => void): () => void {
    this.onStateChangeCallbacks.add(cb);
    cb(this.getState());
    return () => this.onStateChangeCallbacks.delete(cb);
  }

  private notify() {
    const state = this.getState();
    this.onStateChangeCallbacks.forEach((cb) => cb(state));
  }

  /**
   * Initializes the Web Audio context and graph on first user interaction.
   */
  public initOnInteraction(): void {
    if (this.isStarted) return;
    this.startAudio();
  }

  private startAudio(): void {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) {
        console.warn('Web Audio API not supported in this environment.');
        return;
      }

      this.ctx = new AudioCtxClass();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.connect(this.ctx.destination);

      // Low-pass resonant filter (removes any harsh high/mid frequencies, keeping only warm low hum)
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(88, now);
      this.filter.Q.setValueAtTime(2.2, now);
      this.filter.connect(this.masterGain);

      // 1. Primary Infalling Mass Oscillator: 49.0 Hz (G1)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(49.0, now);
      const osc1Gain = this.ctx.createGain();
      osc1Gain.gain.setValueAtTime(0.65, now);
      this.osc1.connect(osc1Gain);
      osc1Gain.connect(this.filter);

      // 2. Secondary Detuned Accretion Disk Oscillator: 52.6 Hz
      // Creates a gentle 3.6 Hz binaural interference pulse (gravitational tidal breathing)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(52.6, now);
      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.48, now);
      this.osc2.connect(osc2Gain);
      osc2Gain.connect(this.filter);

      // 3. Sub-harmonic Schwarzschild void resonance: 24.5 Hz (tactile mass weight)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(24.5, now);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.3, now);
      this.subOsc.connect(subGain);
      subGain.connect(this.filter);

      // 4. Infrasonic LFO modulating filter cutoff at 0.075 Hz (~13-second orbital cycle)
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.075, now);
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(22, now); // Sweeps cutoff between ~66 Hz and ~110 Hz
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);

      // 5. Very faint cosmic background noise (Brownian-style filtered noise)
      try {
        const bufferSize = this.ctx.sampleRate * 2; // 2 seconds of loopable noise
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02; // Brown noise approximation
          lastOut = output[i];
          output[i] *= 1.8;
        }
        this.noiseNode = this.ctx.createBufferSource();
        this.noiseNode.buffer = noiseBuffer;
        this.noiseNode.loop = true;

        this.noiseGain = this.ctx.createGain();
        this.noiseGain.gain.setValueAtTime(0.12, now);
        this.noiseNode.connect(this.noiseGain);
        this.noiseGain.connect(this.filter);
        this.noiseNode.start(now);
      } catch {
        // Fallback gracefully without noise if buffer creation fails
      }

      // Start all oscillators
      this.osc1.start(now);
      this.osc2.start(now);
      this.subOsc.start(now);
      this.lfo.start(now);

      this.isStarted = true;

      // Soft, silky smooth fade-in over 3.2 seconds
      const targetGain = this.isMuted ? 0.0001 : this.calculateEffectiveGain();
      this.masterGain.gain.linearRampToValueAtTime(targetGain, now + 3.2);

      this.notify();
    } catch (err) {
      console.warn('Could not start Event Horizon Audio:', err);
    }
  }

  private calculateEffectiveGain(): number {
    if (this.isMuted) return 0.0001;
    const swell = this.isHoverSwell ? 1.45 : 1.0;
    return Math.max(0.0001, this.baseVolume * this.userVolume * swell);
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('swid_blackhole_audio_muted', String(this.isMuted));
    } catch {
      // Ignore
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      const target = this.calculateEffectiveGain();
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(target, now + 0.6);
    }

    this.notify();
  }

  public setVolume(volume: number): void {
    this.userVolume = Math.max(0, Math.min(1, volume));
    if (this.isMuted && this.userVolume > 0) {
      this.isMuted = false;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      const target = this.calculateEffectiveGain();
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(target, now + 0.3);
    }

    this.notify();
  }

  /**
   * Called when user hovers or interacts closely with the Singularity / Black Hole
   * subtly lifts the filter cutoff and deepens the resonance.
   */
  public setProximitySwell(active: boolean): void {
    if (this.isHoverSwell === active) return;
    this.isHoverSwell = active;

    if (this.ctx && this.filter && this.masterGain) {
      const now = this.ctx.currentTime;
      const targetCutoff = active ? 128 : 88;
      const targetGain = this.calculateEffectiveGain();

      this.filter.frequency.cancelScheduledValues(now);
      this.filter.frequency.setValueAtTime(this.filter.frequency.value, now);
      this.filter.frequency.linearRampToValueAtTime(targetCutoff, now + 1.2);

      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, now + 1.2);
    }

    this.notify();
  }

  public destroy(): void {
    try {
      if (this.ctx && this.ctx.state !== 'closed') {
        this.ctx.close();
      }
    } catch {
      // Ignore
    }
  }
}

export interface AudioEngineState {
  isStarted: boolean;
  isMuted: boolean;
  volume: number;
  isHoverSwell: boolean;
}

// Global Singleton Instance
export const eventHorizonAudio = new EventHorizonAudioEngine();

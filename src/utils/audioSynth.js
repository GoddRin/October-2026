// Bespoke WebAudio Synthesizer for L'Orangerie de Ross Ann (Chapter XIX)
class ConservatoryAudio {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play a warm acoustic harp pluck when inspecting a bloom in the bouquet
  playBloomHarp(bloomIndex = 0) {
    try {
      this.init();
      if (!this.ctx) return;

      // Pentatonic romantic scale in F Major / D Minor
      const scale = [
        261.63, 293.66, 329.63, 392.00, 440.00,
        523.25, 587.33, 659.25, 783.99, 880.00,
        1046.50
      ];
      const baseFreq = scale[bloomIndex % scale.length];
      const harmonyFreq = scale[(bloomIndex + 2) % scale.length];

      [baseFreq, harmonyFreq].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.11, this.ctx.currentTime + idx * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0008, this.ctx.currentTime + idx * 0.07 + 1.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 1.35);
      });
    } catch {
      // Ignore audio errors if blocked by browser
    }
  }

  // Gentle botanical mist spray sound
  playMistSpray() {
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.18));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3200;
      filter.Q.value = 1.8;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      this.playBloomHarp(5);
    } catch {
      // Ignore
    }
  }

  // Wax seal crack & chime when opening Kuya's letter
  playWaxSealOpen() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [392.00, 493.88, 587.33, 783.99];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + i * 0.08 + 1.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 1.15);
      });
    } catch {
      // Ignore
    }
  }

  // Warm heartbeat + sparkle for "Virtual Kiss & Virtual Tight Huggggg"
  playVirtualHug() {
    try {
      this.init();
      if (!this.ctx) return;

      // Low warm heartbeat lub-dub
      [0, 0.22].forEach((offset, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(idx === 0 ? 110 : 95, this.ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(48, this.ctx.currentTime + offset + 0.18);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + offset + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + offset);
        osc.stop(this.ctx.currentTime + offset + 0.21);
      });

      // Followed by sweet high chime
      setTimeout(() => this.playBloomHarp(7), 280);
    } catch {
      // Ignore
    }
  }

  // Grand Midnight Gate Unlock Fanfare
  playConservatoryUnlock() {
    try {
      this.init();
      if (!this.ctx) return;

      const chord = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.09);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + i * 0.09 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + i * 0.09 + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.09);
        osc.stop(this.ctx.currentTime + i * 0.09 + 1.85);
      });
    } catch {
      // Ignore
    }
  }
}

export const conservatoryAudio = new ConservatoryAudio();

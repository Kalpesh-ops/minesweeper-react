// Sound effects utility using Web Audio API

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.enabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Generate simple tones for game sounds
  createTone(frequency, duration, type = 'sine') {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // Envelope for smoother sound
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  // Game-specific sound effects
  playClick() {
    this.createTone(800, 0.1, 'square');
  }

  playFlag() {
    this.createTone(1000, 0.15, 'triangle');
  }

  playReveal() {
    this.createTone(600, 0.08, 'sine');
  }

  playWin() {
    // Victory fanfare
    setTimeout(() => this.createTone(523, 0.2), 0);    // C
    setTimeout(() => this.createTone(659, 0.2), 100);  // E
    setTimeout(() => this.createTone(784, 0.2), 200);  // G
    setTimeout(() => this.createTone(1047, 0.4), 300); // C
  }

  playLose() {
    // Descending sad sound
    setTimeout(() => this.createTone(400, 0.3), 0);
    setTimeout(() => this.createTone(300, 0.3), 150);
    setTimeout(() => this.createTone(200, 0.5), 300);
  }

  playMineHit() {
    // Explosion sound effect
    this.createTone(150, 0.3, 'sawtooth');
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    // Save preference to localStorage
    localStorage.setItem('minesweeper-sound-enabled', JSON.stringify(enabled));
  }

  isEnabled() {
    return this.enabled;
  }

  // Load sound preference from localStorage
  loadPreference() {
    try {
      const saved = localStorage.getItem('minesweeper-sound-enabled');
      if (saved !== null) {
        this.enabled = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Error loading sound preference:', error);
    }
  }
}

// Create singleton instance
const soundManager = new SoundManager();

// Load saved preference on initialization
soundManager.loadPreference();

export default soundManager;

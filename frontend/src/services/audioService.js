// Web Speech & Web Audio Synthesizer for Pronunciation and National Anthems

let currentAudioCtx = null;
let currentOscillators = [];
let anthemTimeoutId = null;

// Speech Synthesis for Country Names, Capitals & Landmarks
export function speakPronunciation(text, onEnd) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88; // Slightly deliberate for clarity
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to find natural voices
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Enhanced')));
  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

// Stop any active anthem music
export function stopAnthemMusic() {
  if (anthemTimeoutId) {
    clearTimeout(anthemTimeoutId);
    anthemTimeoutId = null;
  }
  currentOscillators.forEach(osc => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (e) {}
  });
  currentOscillators = [];
  if (currentAudioCtx && currentAudioCtx.state !== 'closed') {
    try {
      currentAudioCtx.close();
    } catch (e) {}
    currentAudioCtx = null;
  }
}

// Noble Ceremonial Anthem Harmonic Chords / Fanfare using Web Audio API (Offline, Zero Latency)
export function playCeremonialAnthem(countryName, onComplete) {
  stopAnthemMusic();

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return false;

  const ctx = new AudioContext();
  currentAudioCtx = ctx;

  // Melodic notes frequency table (Harmonic ceremonial sequence: Tonic - Dominant - Subdominant - Majestic Resolution)
  const NOTES = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00,
    'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25,
    'G3': 196.00, 'C3': 130.81, 'F3': 174.61, 'A3': 220.00
  };

  // Ceremonial sequence: [note, duration in seconds, bassNote]
  const sequence = [
    { note: NOTES['C4'], bass: NOTES['C3'], dur: 0.6 },
    { note: NOTES['E4'], bass: NOTES['C3'], dur: 0.6 },
    { note: NOTES['G4'], bass: NOTES['G3'], dur: 0.8 },
    { note: NOTES['C5'], bass: NOTES['C3'], dur: 1.0 },
    { note: NOTES['B4'], bass: NOTES['G3'], dur: 0.5 },
    { note: NOTES['A4'], bass: NOTES['F3'], dur: 0.5 },
    { note: NOTES['G4'], bass: NOTES['C3'], dur: 0.9 },
    { note: NOTES['E4'], bass: NOTES['A3'], dur: 0.5 },
    { note: NOTES['F4'], bass: NOTES['F3'], dur: 0.6 },
    { note: NOTES['D4'], bass: NOTES['G3'], dur: 0.6 },
    { note: NOTES['C4'], bass: NOTES['C3'], dur: 1.6 }
  ];

  let currentTime = ctx.currentTime + 0.05;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
  masterGain.connect(ctx.destination);

  sequence.forEach(({ note, bass, dur }) => {
    // Lead Horn / Brass Voice
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(note, currentTime);
    gain1.gain.setValueAtTime(0.2, currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, currentTime + dur);
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(currentTime);
    osc1.stop(currentTime + dur);
    currentOscillators.push(osc1);

    // Warm Harmonic Flute / Brass Voice
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(note * 1.002, currentTime);
    gain2.gain.setValueAtTime(0.15, currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, currentTime + dur);
    osc2.connect(gain2);
    gain2.connect(masterGain);
    osc2.start(currentTime);
    osc2.stop(currentTime + dur);
    currentOscillators.push(osc2);

    // Deep Timpani / Grand Bass Voice
    if (bass) {
      const oscBass = ctx.createOscillator();
      const gainBass = ctx.createGain();
      oscBass.type = 'triangle';
      oscBass.frequency.setValueAtTime(bass, currentTime);
      gainBass.gain.setValueAtTime(0.22, currentTime);
      gainBass.gain.exponentialRampToValueAtTime(0.001, currentTime + dur);
      oscBass.connect(gainBass);
      gainBass.connect(masterGain);
      oscBass.start(currentTime);
      oscBass.stop(currentTime + dur);
      currentOscillators.push(oscBass);
    }

    currentTime += dur;
  });

  const totalDuration = (currentTime - ctx.currentTime) * 1000;
  anthemTimeoutId = setTimeout(() => {
    stopAnthemMusic();
    if (onComplete) onComplete();
  }, totalDuration);

  return true;
}

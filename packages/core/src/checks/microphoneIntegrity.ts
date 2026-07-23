export interface MicrophoneIntegrityResult {
  virtualMicDetected: boolean;
  audioLevel: number;
  audioVariation: number;
  hasSignal: boolean;
  audioScore: number;
}

export async function checkMicrophoneIntegrity(
  stream: MediaStream
): Promise<MicrophoneIntegrityResult> {
  const result: MicrophoneIntegrityResult = {
    virtualMicDetected: false,
    audioLevel: 0,
    audioVariation: 0,
    hasSignal: false,
    audioScore: 0,
  };

  // Check track labels for virtual audio indicators
  const audioTracks = stream.getAudioTracks();
  if (audioTracks.length > 0) {
    const label = audioTracks[0].label.toLowerCase();
    const virtualIndicators = [
      'virtual',
      'loopback',
      'screen capture',
      'display',
      'blackhole',
      'soundflower',
      'vb cable',
      'voicemeeter',
    ];
    if (virtualIndicators.some((v) => label.includes(v))) {
      result.virtualMicDetected = true;
    }

    if (!label || label === '' || label === 'unknown') {
      result.virtualMicDetected = true;
    }
  }

  // Analyze audio levels using Web Audio API
  try {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const samples: number[] = [];
    const sampleCount = 30;

    for (let i = 0; i < sampleCount; i++) {
      await new Promise((r) => setTimeout(r, 100));
      analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let j = 0; j < dataArray.length; j++) {
        sum += Math.abs(dataArray[j] - 128);
      }
      const avg = sum / dataArray.length;
      samples.push(avg);
    }

    source.disconnect();
    audioCtx.close();

    result.audioLevel =
      samples.length > 0
        ? samples.reduce((a, b) => a + b, 0) / samples.length / 128
        : 0;

    result.hasSignal = samples.some((s) => s > 5);

    // Audio variation: natural audio has changing levels
    if (samples.length > 2) {
      let variation = 0;
      for (let i = 1; i < samples.length; i++) {
        variation += Math.abs(samples[i] - samples[i - 1]);
      }
      result.audioVariation = variation / (samples.length - 1) / 128;
    }

    // Score: has signal + natural variation = real microphone
    let score = 0;
    if (result.hasSignal) score += 0.4;
    score += Math.min(0.6, result.audioVariation * 3);
    result.audioScore = Math.min(1, score);
  } catch {
    // Audio analysis failed — likely no permission or blocked
    result.audioScore = 0;
  }

  return result;
}

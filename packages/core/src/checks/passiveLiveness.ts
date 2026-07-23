import {
  captureFrame,
  computeFrameDiff,
  computeGlobalBrightness,
} from '../utils/canvas.js';
import type { LivenessSignals } from '../types.js';

export async function checkPassiveLiveness(
  stream: MediaStream
): Promise<LivenessSignals> {
  const result: LivenessSignals = {
    faceDetected: false,
    faceConfidence: 0,
    movementDetected: false,
    blinksDetected: 0,
    naturalMotion: false,
    livenessScore: 0,
  };

  const video = document.createElement('video');
  video.srcObject = stream;
  await video.play();

  // Try native FaceDetector API first
  let faceDetected = false;
  let faceConfidence = 0;

  if ('FaceDetector' in window) {
    try {
      const detector = new (window as any).FaceDetector({
        maxDetectedFaces: 1,
        fastMode: true,
      });

      // Try detection multiple times
      for (let attempt = 0; attempt < 5; attempt++) {
        await new Promise((r) => setTimeout(r, 200));
        const faces = await detector.detect(video);
        if (faces.length > 0) {
          faceDetected = true;
          const face = faces[0];
          const area = (face.boundingBox.width / video.videoWidth) *
                       (face.boundingBox.height / video.videoHeight);
          faceConfidence = Math.min(1, area * 2.5);
          break;
        }
      }
    } catch {
      // FaceDetector failed, fall through
    }
  }

  // Fallback heuristic: if FaceDetector unavailable, use motion + brightness
  // A face presence correlates with stable brightness region in center
  const frames: ImageData[] = [];
  const brightnessValues: number[] = [];
  const sampleCount = 30;
  const sampleInterval = 100;

  for (let i = 0; i < sampleCount; i++) {
    await new Promise((r) => setTimeout(r, sampleInterval));
    const frame = captureFrame(video);
    if (frame) {
      frames.push(frame);
      brightnessValues.push(computeGlobalBrightness(frame));
    }
  }

  video.pause();

  if (!faceDetected && frames.length > 5) {
    // If brightness has natural variation (not static), assume face possible
    const brightnessVariation = Math.max(...brightnessValues) -
      Math.min(...brightnessValues);
    if (brightnessVariation > 15) {
      faceDetected = true;
      faceConfidence = Math.min(1, brightnessVariation / 60);
    }
  }

  result.faceDetected = faceDetected;
  result.faceConfidence = faceConfidence;

  // Movement detection from frame diffs
  const diffs: number[] = [];
  for (let i = 1; i < frames.length; i++) {
    const diff = computeFrameDiff(frames[i - 1], frames[i]);
    diffs.push(diff);
  }

  const avgMotion =
    diffs.length > 0 ? diffs.reduce((a, b) => a + b, 0) / diffs.length : 0;
  result.movementDetected = avgMotion > 0.02;

  // Blink detection: look for rapid brightness change
  // A blink causes a quick dip in brightness then recovery
  let blinksDetected = 0;
  for (let i = 2; i < brightnessValues.length; i++) {
    const before = brightnessValues[i - 1];
    const current = brightnessValues[i];
    const change = Math.abs(current - before);
    // Blink: sudden change > threshold then recovery
    if (change > 5 && i + 1 < brightnessValues.length) {
      const recovery = Math.abs(brightnessValues[i + 1] - current);
      if (recovery > 3) {
        blinksDetected++;
        i += 2;
      }
    }
  }
  result.blinksDetected = blinksDetected;

  // Natural motion: variability in movement direction/amplitude
  if (diffs.length > 5) {
    let directionChanges = 0;
    for (let i = 1; i < diffs.length; i++) {
      const dPrev = diffs[i - 1] - (diffs.length > 1 ? avgMotion : 0);
      const dCurr = diffs[i] - avgMotion;
      if (dPrev * dCurr < 0) directionChanges++;
    }
    // Natural movement has frequent direction changes
    const changeRate = directionChanges / (diffs.length - 1);
    result.naturalMotion = changeRate > 0.2 && result.movementDetected;
  }

  // Compute overall livenessScore
  let score = 0;
  if (faceDetected) score += 0.3;
  if (result.movementDetected) score += 0.2;
  if (result.blinksDetected > 0) score += 0.25;
  if (result.naturalMotion) score += 0.25;

  result.livenessScore = Math.min(1, score);

  return result;
}

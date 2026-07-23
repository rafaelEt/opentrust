import { captureFrame, computeFrameDiff } from '../utils/canvas.js';
import type { FrameAnalysis } from '../types.js';

export interface WebcamIntegrityResult {
  virtualCameraDetected: boolean;
  frameAnalysis: FrameAnalysis;
}

export async function checkWebcamIntegrity(
  stream: MediaStream
): Promise<WebcamIntegrityResult> {
  const result: WebcamIntegrityResult = {
    virtualCameraDetected: false,
    frameAnalysis: {
      isStatic: false,
      motionScore: 0,
      frameDiffs: [],
      avgFps: 0,
    },
  };

  // Check track labels for virtual camera indicators
  const videoTracks = stream.getVideoTracks();
  if (videoTracks.length > 0) {
    const label = videoTracks[0].label.toLowerCase();
    const virtualIndicators = [
      'virtual',
      'obs',
      'screen capture',
      'display capture',
      'vcam',
      'manycam',
      'splitcam',
      'camtwist',
      'epoccam',
      'droidcam',
      'ivi',
    ];
    if (virtualIndicators.some((v) => label.includes(v))) {
      result.virtualCameraDetected = true;
    }

    // Check for missing camera label
    if (!label || label === '' || label === 'unknown') {
      result.virtualCameraDetected = true;
    }
  }

  // Analyze frame changes
  const video = document.createElement('video');
  video.srcObject = stream;
  video.play();

  const frames: ImageData[] = [];
  const timestamps: number[] = [];
  const diffs: number[] = [];
  const sampleCount = 30;
  const sampleInterval = 100;

  for (let i = 0; i < sampleCount; i++) {
    await new Promise((r) => setTimeout(r, sampleInterval));
    const frame = captureFrame(video);
    if (frame) {
      timestamps.push(performance.now());
      if (frames.length > 0) {
        const diff = computeFrameDiff(frames[frames.length - 1], frame);
        diffs.push(diff);
      }
      frames.push(frame);
    }
  }

  video.pause();

  // Check for static video (all diffs very low)
  const staticThreshold = 0.01;
  const highMotionThreshold = 0.05;
  const staticFrames = diffs.filter((d) => d < staticThreshold).length;
  const highMotionFrames = diffs.filter((d) => d > highMotionThreshold).length;

  result.frameAnalysis.isStatic = staticFrames > diffs.length * 0.8;
  result.frameAnalysis.frameDiffs = diffs;
  result.frameAnalysis.motionScore =
    diffs.length > 0 ? diffs.reduce((a, b) => a + b, 0) / diffs.length : 0;

  // Analyze replay risk: extremely periodic patterns in diffs
  if (diffs.length > 10) {
    let avgChange = 0;
    for (let i = 2; i < diffs.length; i++) {
      avgChange += Math.abs(diffs[i] - diffs[i - 1]);
    }
    avgChange /= diffs.length - 2;
    // Low variation in frame diffs + low motion = replay risk
    if (avgChange < 0.008 && result.frameAnalysis.motionScore < 0.03) {
      result.frameAnalysis.isStatic = true;
    }
  }

  // Compute avg FPS
  if (timestamps.length > 1) {
    const totalTime = timestamps[timestamps.length - 1] - timestamps[0];
    result.frameAnalysis.avgFps = ((timestamps.length - 1) / totalTime) * 1000;
  }

  return result;
}

import type {
  OpenTrustOptions,
  OpenTrustResult,
} from './types.js';
import { detectBrowserAutomation } from './checks/browserAutomation.js';
import { checkWebcamIntegrity } from './checks/webcamIntegrity.js';
import { checkPassiveLiveness } from './checks/passiveLiveness.js';
import { getCameraStream, stopCameraStream } from './utils/media.js';
import { getMicrophoneStream, stopAudioStream } from './utils/audio.js';
import { checkMicrophoneIntegrity } from './checks/microphoneIntegrity.js';

export class OpenTrust {
  static async verify(
    options: OpenTrustOptions = {}
  ): Promise<OpenTrustResult> {
    const { camera = false, microphone = false, timeout = 15000 } = options;

    const startTime = performance.now();

    // Step 1: Check browser automation (no permissions needed)
    const automation = detectBrowserAutomation();

    // Step 2: Camera-based checks
    let virtualCameraDetected = false;
    let livenessScore = 0;
    let faceDetected = false;
    let replayRisk = 0;
    let motionScore = 0;

    if (camera) {
      const stream = await getCameraStream(timeout);

      if (stream) {
        const [integrity, liveness] = await Promise.all([
          checkWebcamIntegrity(stream),
          checkPassiveLiveness(stream),
        ]);

        virtualCameraDetected = integrity.virtualCameraDetected;
        motionScore = integrity.frameAnalysis.motionScore;

        if (integrity.frameAnalysis.isStatic && liveness.movementDetected === false) {
          replayRisk = 0.8 + (1 - integrity.frameAnalysis.motionScore) * 0.2;
        } else if (integrity.frameAnalysis.isStatic) {
          replayRisk = 0.5;
        } else {
          replayRisk = Math.max(0, 0.3 - integrity.frameAnalysis.motionScore);
        }

        replayRisk = Math.min(1, Math.max(0, replayRisk));

        faceDetected = liveness.faceDetected;
        livenessScore = liveness.livenessScore;

        stopCameraStream(stream);
      } else {
        livenessScore = 0;
        faceDetected = false;
        replayRisk = 1;
      }
    }

    // Step 3: Microphone-based checks
    let audioScore = 0;
    let virtualMicDetected = false;

    if (microphone) {
      const audioStream = await getMicrophoneStream(timeout);

      if (audioStream) {
        const micResult = await checkMicrophoneIntegrity(audioStream);
        audioScore = micResult.audioScore;
        virtualMicDetected = micResult.virtualMicDetected;
        stopAudioStream(audioStream);
      }
    }

    // Step 4: Compute overall human score
    const weights = {
      liveness: 0.3,
      automation: 0.25,
      replay: 0.15,
      facePresence: 0.1,
      audio: 0.2,
    };

    let humanScore = 0;

    humanScore += livenessScore * weights.liveness;

    if (automation.detected) {
      humanScore += (1 - automation.confidence) * weights.automation;
    } else {
      humanScore += weights.automation;
    }

    humanScore += (1 - replayRisk) * weights.replay;

    if (faceDetected) {
      humanScore += weights.facePresence;
    }

    humanScore += audioScore * weights.audio;

    humanScore = Math.min(1, Math.max(0, humanScore));

    const elapsed = performance.now() - startTime;

    return {
      humanScore,
      signals: {
        faceDetected,
        livenessScore,
        virtualCameraDetected,
        browserAutomationDetected: automation.detected,
        replayRisk,
        audioScore,
        virtualMicDetected,
      },
      timestamp: Date.now(),
    };
  }
}

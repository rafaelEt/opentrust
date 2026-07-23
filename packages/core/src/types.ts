export interface OpenTrustOptions {
  camera?: boolean;
  microphone?: boolean;
  timeout?: number;
}

export interface OpenTrustSignals {
  faceDetected: boolean;
  livenessScore: number;
  virtualCameraDetected: boolean;
  browserAutomationDetected: boolean;
  replayRisk: number;
  audioScore: number;
  virtualMicDetected: boolean;
}

export interface OpenTrustResult {
  humanScore: number;
  signals: OpenTrustSignals;
  timestamp: number;
}

export interface FrameAnalysis {
  isStatic: boolean;
  motionScore: number;
  frameDiffs: number[];
  avgFps: number;
}

export interface AutomationSignals {
  detected: boolean;
  webdriver: boolean;
  headless: boolean;
  abnormalProperties: boolean;
  confidence: number;
}

export interface LivenessSignals {
  faceDetected: boolean;
  faceConfidence: number;
  movementDetected: boolean;
  blinksDetected: number;
  naturalMotion: boolean;
  livenessScore: number;
}

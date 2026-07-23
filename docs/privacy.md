# Privacy Architecture

OpenTrust is designed with privacy as a first principle.

## Core Commitment

**OpenTrust never uploads camera frames, microphone audio, or any raw media to a server.**

## How It Works

### Data Flow

1. **Camera Access**: The SDK requests a `MediaStream` via `getUserMedia()`. This stream never leaves the browser.

2. **Frame Processing**: Video frames are captured using `<canvas>` element. Analysis happens entirely in JavaScript:
   - Frame diffs are computed by comparing `ImageData` arrays in memory
   - Face detection uses the browser's built-in `FaceDetector` API (when available)
   - Blink detection uses pixel brightness deltas
   - No frame data is serialized, logged, or transmitted

3. **Audio**: Microphone audio is processed entirely via `AudioContext` / `AnalyserNode` — only frequency-domain features are analyzed client-side.

### What IS Sent

Only the **result object** leaves the SDK:

```typescript
{
  humanScore: number,      // 0-1 confidence score
  signals: {
    faceDetected: boolean,
    livenessScore: number,
    virtualCameraDetected: boolean,
    browserAutomationDetected: boolean,
    replayRisk: number
  },
  timestamp: number        // when verification was performed
}
```

No images. No video. No audio. No raw pixel data.

## Threat Model

| Concern | Mitigation |
|---------|-----------|
| Raw frame upload | All processing in memory, never serialized |
| Third-party tracking | No external dependencies, no analytics pings |
| Persistent fingerprinting | No cookies, no localStorage, no indexedDB |
| Man-in-the-middle | Result can be verified server-side (future HMAC) |
| SDK integrity | Open source, auditable, MIT licensed |

## Comparison

| Platform | Client-Side Processing | Raw Data Upload | Open Source |
|----------|----------------------|-----------------|-------------|
| OpenTrust | ✅ All frames | ❌ Never | ✅ MIT |
| Face++ | ❌ Server-side | ✅ Yes | ❌ |
| Amazon Rekognition | ❌ Server-side | ✅ Yes | ❌ |
| Google ML Kit | ✅ Partial | ✅ Yes | ❌ |

## Your Responsibility

As a developer using OpenTrust, you should:

- Display a privacy notice explaining camera/mic use
- Only request camera/mic when the user initiates verification
- Never store or transmit raw frames yourself
- Use HTTPS to protect the result transmission

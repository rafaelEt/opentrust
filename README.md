# OpenTrust

**Open-source trust layer for proving a real human is behind an online interaction.**

OpenTrust is a privacy-first SDK that gives websites confidence signals to distinguish real humans from AI-generated deepfakes and automated browsers.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/opentrust-sdk)](https://www.npmjs.com/package/opentrust-sdk)
[![Website](https://img.shields.io/badge/demo-open--trust.vercel.app-8b5cf6)](https://open--trust.vercel.app)
[![GitHub](https://img.shields.io/badge/github-rafaelEt/opentrust-181717)](https://github.com/rafaelEt/opentrust)

---

## The Problem

AI can now generate photorealistic faces, synthesize voice and video in real time, and drive headless browsers indistinguishable from real users. The internet has no native way to ask: **"Is there a real human here?"**

## The Solution

OpenTrust is an **open-source client-side SDK** that runs checks in the browser and returns confidence signals:

- **Browser automation detection** — webdriver, headless browsers, abnormal properties
- **Webcam integrity checks** — virtual cameras, static/replayed video, frame anomalies
- **Passive liveness detection** — face presence, natural movement, blinks
- **Privacy-first architecture** — all processing locally; raw frames never leave

---

## Installation

```bash
npm install opentrust-sdk
```

## Quick Start

```typescript
import { OpenTrust } from 'opentrust-sdk';

const result = await OpenTrust.verify({
  camera: true,
});

console.log(result.humanScore);     // 0.85
console.log(result.signals);
// {
//   faceDetected: true,
//   livenessScore: 0.72,
//   virtualCameraDetected: false,
//   browserAutomationDetected: false,
//   replayRisk: 0.12,
//   audioScore: 0.0,
//   virtualMicDetected: false
// }
```

## API

### `OpenTrust.verify(options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `camera` | `boolean` | `false` | Enable webcam checks |
| `microphone` | `boolean` | `false` | Enable microphone checks |
| `timeout` | `number` | `15000` | Max time in ms |

### Returns

```typescript
{
  humanScore: number,         // 0.0 - 1.0
  signals: {
    faceDetected: boolean,
    livenessScore: number,
    virtualCameraDetected: boolean,
    browserAutomationDetected: boolean,
    replayRisk: number,
    audioScore: number,
    virtualMicDetected: boolean,
  },
  timestamp: number
}
```

---

## React Hook

```bash
npm install opentrust-react
```

```tsx
import { useOpenTrust } from 'opentrust-react';

function VerificationButton() {
  const { result, loading, verify } = useOpenTrust();

  return (
    <button onClick={() => verify({ camera: true })} disabled={loading}>
      {loading ? 'Verifying...' : "Verify I'm Human"}
    </button>
  );
}
```

---

## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/opentrust-sdk@0.1.0/dist-browser/opentrust.umd.js"></script>
<script>
  const r = await OpenTrust.verify({ camera: true });
</script>
```

---

## Demo

```bash
git clone https://github.com/rafaelEt/opentrust.git
cd opentrust
npm install
npm run dev
```

Or with Docker:

```bash
docker compose up
```

Visit [http://localhost:3000](http://localhost:3000).

Or try the live demo: [https://open--trust.vercel.app](https://open--trust.vercel.app)

---

## Privacy

OpenTrust never uploads raw camera frames or microphone audio. All processing is client-side. See [docs/privacy.md](docs/privacy.md).

---

## License

MIT — see [LICENSE](LICENSE).

---

## Contributing

Contributions welcome. [GitHub](https://github.com/rafaelEt/opentrust) · [Live Demo](https://open--trust.vercel.app)

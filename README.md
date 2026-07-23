# OpenTrust

**Privacy-first browser trust signals for modern web applications.**

OpenTrust is an open-source SDK that collects privacy-preserving browser signals to help developers estimate the trustworthiness of a browser interaction. It provides signals — not decisions — designed to be combined with authentication, device reputation, and server-side verification systems.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/opentrust-sdk)](https://www.npmjs.com/package/opentrust-sdk)
[![Website](https://img.shields.io/badge/demo-open--trust.vercel.app-8b5cf6)](https://open--trust.vercel.app)
[![GitHub](https://img.shields.io/badge/github-rafaelEt/opentrust-181717)](https://github.com/rafaelEt/opentrust)

---

## Overview

OpenTrust exposes browser-side trust signals through a clean TypeScript API:

- **Browser automation detection** — webdriver flags, headless browsers, abnormal properties
- **Webcam integrity checks** — virtual camera detection, static/replayed video analysis
- **Passive liveness analysis** — face presence, motion, blink detection
- **Microphone integrity** — virtual mic detection, audio signal analysis

All processing is client-side. Raw frames never leave the device.

## When to use OpenTrust

OpenTrust is designed to provide **additional signals** for:

- Fraud prevention workflows
- Risk scoring and trust estimation
- Bot mitigation systems
- Browser integrity checks
- Research and experimentation
- Developer tooling and prototypes

## When not to use OpenTrust

OpenTrust is **not** a replacement for:

- KYC (Know Your Customer)
- Identity verification
- Enterprise liveness detection
- Device attestation
- Server-side fraud detection

## Philosophy

Security is built from multiple layers. OpenTrust intentionally focuses on browser-side trust signals and should be combined with server-side verification and authentication systems. The SDK returns confidence signals — not binary "human/bot" judgments.

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

console.log(result.trustScore);     // 0.85
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
  trustScore: number,         // 0.0 - 1.0
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
      {loading ? 'Analyzing...' : 'Collect Trust Signals'}
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

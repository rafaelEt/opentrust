# OpenTrust SDK

Privacy-first human presence verification. Detect bots, deepfakes, and automated browsers.

```bash
npm install opentrust-sdk
```

```typescript
import { OpenTrust } from 'opentrust-sdk';

const result = await OpenTrust.verify({ camera: true });
console.log(result.humanScore); // 0.0 - 1.0
```

- All processing runs client-side — raw frames never leave the device
- Detects webdriver, headless browsers, virtual cameras, and replay attacks
- Passive liveness via face detection, motion analysis, and blink detection
- TypeScript-first with full type definitions

[GitHub](https://github.com/rafaelEt/opentrust) · [Docs](https://github.com/rafaelEt/opentrust#readme) · MIT License

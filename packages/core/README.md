# OpenTrust SDK

Open-source browser trust signals SDK. Collect privacy-first signals for browser integrity, automation detection, webcam integrity, and passive liveness.

```bash
npm install opentrust-sdk
```

```typescript
import { OpenTrust } from 'opentrust-sdk';

const result = await OpenTrust.verify({ camera: true });
console.log(result.trustScore); // 0.0 - 1.0
```

- All processing runs client-side — raw frames never leave the device
- Provides signals for browser automation, virtual cameras, and replay detection
- Passive liveness analysis via face detection, motion, and blink signals
- TypeScript-first with full type definitions

[GitHub](https://github.com/rafaelEt/opentrust) · [Docs](https://github.com/rafaelEt/opentrust#readme) · MIT License

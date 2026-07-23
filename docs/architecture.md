# Architecture

OpenTrust is a privacy-first, client-side SDK that runs entirely in the browser.

```

┌─────────────────────────────────────────────────────┐
│                   Your Website                       │
│  ┌───────────────────────────────────────────────┐  │
│  │            OpenTrust.verify()                  │  │
│  │                                               │  │
│  │  ┌─────────────────┐  ┌───────────────────┐  │  │
│  │  │ Browser          │  │ Webcam            │  │  │
│  │  │ Automation       │  │ Integrity         │  │  │
│  │  │ Detection        │  │ Checks            │  │  │
│  │  │                  │  │                   │  │  │
│  │  │ • webdriver flag │  │ • virtual camera  │  │  │
│  │  │ • headless UA    │  │ • static video    │  │  │
│  │  │ • CDP signals    │  │ • replay analysis │  │  │
│  │  │ • plugins check  │  │                   │  │  │
│  │  └─────────────────┘  └────────┬──────────┘  │  │
│  │                                 │             │  │
│  │  ┌──────────────────────────────▼──────────┐  │  │
│  │  │         Passive Liveness                │  │  │
│  │  │                                         │  │  │
│  │  │  • face detection (FaceDetector API)    │  │  │
│  │  │  • motion analysis (frame diffs)        │  │  │
│  │  │  • blink detection (brightness delta)   │  │  │
│  │  │  • natural movement patterns            │  │  │
│  │  └──────────────────┬──────────────────────┘  │  │
│  │                     │                         │  │
│  │  ┌──────────────────▼──────────────────────┐  │  │
│  │  │         Scoring Engine                  │  │  │
│  │  │                                         │  │  │
│  │  │  humanScore = weighted combination of   │  │  │
│  │  │  liveness, automation, replay, face     │  │  │
│  │  └──────────────────┬──────────────────────┘  │  │
│  │                     │                         │  │
│  │  ┌──────────────────▼──────────────────────┐  │  │
│  │  │         OpenTrustResult                  │  │  │
│  │  │  { humanScore, signals, timestamp }     │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

```

## Design Principles

1. **Privacy First** - All media processing happens client-side. Raw frames never leave the device.
2. **Defense in Depth** - Multiple independent signals combined into a single confidence score.
3. **Graceful Degradation** - Each check has a fallback. If FaceDetector API is unavailable, motion heuristics are used.
4. **No False Confidence** - The SDK returns confidence signals, not binary "human/bot" judgments.

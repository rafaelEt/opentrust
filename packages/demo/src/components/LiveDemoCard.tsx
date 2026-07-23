import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OpenTrust } from 'opentrust-sdk';
import { Loader2 } from 'lucide-react';
import type { OpenTrustResult } from 'opentrust-sdk';

type Status = 'idle' | 'analyzing' | 'done' | 'error';

interface LiveDemoCardProps {
  triggerVerify?: number;
}

export function LiveDemoCard({ triggerVerify = 0 }: LiveDemoCardProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<OpenTrustResult | null>(null);

  useEffect(() => {
    if (triggerVerify > 0) run();
  }, [triggerVerify]);

  const run = useCallback(async () => {
    setStatus('analyzing');
    setResult(null);
    try {
      const res = await OpenTrust.verify({ camera: true, timeout: 12000 });
      setResult(res);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }, []);

  return (
    <div className="code-window shadow-2xl">
      <div className="code-header">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 text-zinc-500">opentrust.verify()</span>
        </div>
        <span className="text-zinc-600">v0.1.0</span>
      </div>

      <div className="p-5">
        {/* Status bar */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-zinc-800/60">
          {status === 'idle' && (
            <>
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="text-xs font-mono text-zinc-500">ready</span>
            </>
          )}
          {status === 'analyzing' && (
            <>
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-mono text-indigo-300">analyzing...</span>
            </>
          )}
          {status === 'done' && (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-emerald-300">signals collected</span>
            </>
          )}
          {status === 'error' && (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-mono text-red-300">analysis failed</span>
            </>
          )}
        </div>

        {/* JSON output */}
        <div className="font-mono text-sm leading-relaxed min-h-[260px]">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-zinc-700"
              >
                Run analysis to collect trust signals
              </motion.div>
            )}

            {status === 'analyzing' && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1 text-zinc-500"
              >
                <div className="flex items-center gap-2 text-indigo-400">
                  <Loader2 size={12} className="animate-spin" />
                  Requesting camera access...
                </div>
                <div className="text-zinc-700">{'{'}</div>
                <div className="text-zinc-700">  "trustScore": ?</div>
                <div className="text-zinc-700">  "signals": ?</div>
                <div className="text-zinc-700">{'}'}</div>
              </motion.div>
            )}

            {status === 'done' && result && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <pre className="text-zinc-200 whitespace-pre-wrap">
                  <span className="text-zinc-500">{'{'}</span>{'\n'}
                  <span className="text-indigo-300">  "trustScore"</span>: <span className="text-emerald-300">{result.trustScore}</span>,{'\n'}
                  <span className="text-indigo-300">  "signals"</span>: <span className="text-zinc-500">{'{'}</span>{'\n'}
                  <span className="text-indigo-300">    "faceDetected"</span>: <span className="text-amber-300">{String(result.signals.faceDetected)}</span>,{'\n'}
                  <span className="text-indigo-300">    "livenessScore"</span>: <span className="text-emerald-300">{result.signals.livenessScore}</span>,{'\n'}
                  <span className="text-indigo-300">    "virtualCameraDetected"</span>: <span className="text-amber-300">{String(result.signals.virtualCameraDetected)}</span>,{'\n'}
                  <span className="text-indigo-300">    "browserAutomationDetected"</span>: <span className="text-amber-300">{String(result.signals.browserAutomationDetected)}</span>,{'\n'}
                  <span className="text-indigo-300">    "replayRisk"</span>: <span className="text-emerald-300">{result.signals.replayRisk}</span>,{'\n'}
                  <span className="text-indigo-300">    "audioScore"</span>: <span className="text-emerald-300">{result.signals.audioScore}</span>,{'\n'}
                  <span className="text-indigo-300">    "virtualMicDetected"</span>: <span className="text-amber-300">{String(result.signals.virtualMicDetected)}</span>,{'\n'}
                  <span className="text-zinc-500">  </span>{'}'},{'\n'}
                  <span className="text-indigo-300">  "timestamp"</span>: <span className="text-amber-300">{result.timestamp}</span>,{'\n'}
                  <span className="text-zinc-500">{'}'}</span>
                </pre>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400"
              >
                Camera unavailable or permission denied
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action */}
        <button
          onClick={run}
          disabled={status === 'analyzing'}
          className="w-full mt-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-zinc-950 hover:bg-zinc-200"
        >
          {status === 'idle' && 'Collect Trust Signals'}
          {status === 'analyzing' && 'Analyzing...'}
          {status === 'done' && 'Analyze Again'}
          {status === 'error' && 'Retry'}
        </button>
      </div>
    </div>
  );
}

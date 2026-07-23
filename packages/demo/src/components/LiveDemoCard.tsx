import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OpenTrust } from 'opentrust-sdk';
import { Check, X, Loader2, Shield } from 'lucide-react';

type Status = 'idle' | 'analyzing' | 'done' | 'error';

interface SignalRow {
  label: string;
  ok: boolean;
}

interface LiveDemoCardProps {
  triggerVerify?: number;
}

export function LiveDemoCard({ triggerVerify = 0 }: LiveDemoCardProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [signals, setSignals] = useState<SignalRow[]>([]);
  const [score, setScore] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (triggerVerify > 0) {
      run();
    }
  }, [triggerVerify]);

  const run = useCallback(async () => {
    setStatus('analyzing');
    setSignals([]);

    try {
      const result = await OpenTrust.verify({ camera: true, timeout: 12000 });

      setSignals([
        { label: 'Camera access', ok: true },
        { label: 'Face detected', ok: result.signals.faceDetected },
        { label: 'Natural movement', ok: result.signals.livenessScore > 0.4 },
        { label: 'Browser verified', ok: !result.signals.browserAutomationDetected },
      ]);
      setScore(Math.round(result.humanScore * 100));
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }, []);

  const analyzingRows = [
    { label: 'Camera access' },
    { label: 'Face detected' },
    { label: 'Natural movement' },
    { label: 'Browser verified' },
  ];

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

      <div className="p-5 space-y-5">
        {/* Status */}
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Status</div>
          <div className="flex items-center gap-2">
            {status === 'idle' && <span className="text-sm font-mono text-zinc-500">ready</span>}
            {status === 'analyzing' && (
              <>
                <span className="status-dot bg-indigo-400 animate-pulse" />
                <span className="text-sm font-mono text-indigo-300">analyzing...</span>
              </>
            )}
            {status === 'done' && (
              <>
                <span className="status-dot bg-emerald-500" />
                <span className="text-sm font-mono text-emerald-300">verified</span>
              </>
            )}
            {status === 'error' && (
              <>
                <span className="status-dot bg-red-500" />
                <span className="text-sm font-mono text-red-300">failed</span>
              </>
            )}
          </div>
        </div>

        {/* Signals */}
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2.5">Signals</div>
          <div className="space-y-1.5">
            <AnimatePresence mode="popLayout">
              {(status === 'analyzing' ? analyzingRows : signals).map((s: any, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.25 }}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-950/60"
                >
                  <span className="text-sm text-zinc-300">{s.label}</span>
                  <span className="text-xs font-mono">
                    {status === 'analyzing' ? (
                      <span className="text-indigo-400 animate-pulse inline-flex items-center gap-1">
                        <Loader2 size={11} className="animate-spin" />
                        scan
                      </span>
                    ) : s.ok ? (
                      <span className="text-emerald-400 inline-flex items-center gap-1">
                        <Check size={11} strokeWidth={2.5} /> OK
                      </span>
                    ) : (
                      <span className="text-zinc-600 inline-flex items-center gap-1">
                        <X size={11} strokeWidth={2} /> --
                      </span>
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Score */}
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Human Confidence</div>
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold font-mono text-zinc-700">
                ---
              </motion.div>
            )}
            {status === 'analyzing' && (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                  />
                </div>
                <span className="text-sm font-mono text-indigo-300 w-10 text-right animate-pulse">--%</span>
              </motion.div>
            )}
            {status === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: score > 70 ? '#22c55e' : score > 40 ? '#eab308' : '#ef4444' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-2xl font-bold font-mono text-zinc-100 w-14 text-right tabular-nums">{score}%</span>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-mono text-red-400">
                Camera unavailable or denied
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action */}
        <button
          onClick={run}
          disabled={status === 'analyzing'}
          className="w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-zinc-950 hover:bg-zinc-200"
        >
          {status === 'idle' && 'Run Verification'}
          {status === 'analyzing' && 'Analyzing...'}
          {status === 'done' && 'Verify Again'}
          {status === 'error' && 'Retry'}
        </button>
      </div>
    </div>
  );
}

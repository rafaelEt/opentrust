import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { GithubIcon } from './icons';
import { LiveDemoCard } from './LiveDemoCard';

interface HeroProps {
  onTryDemo: () => void;
  triggerVerify: number;
}

export function Hero({ onTryDemo, triggerVerify }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/40">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900/80 border border-zinc-800 text-zinc-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Open-source browser trust signals SDK
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.05] mb-5">
              Browser trust signals{' '}
              <span className="gradient-text">for the AI era.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-8">
              OpenTrust is an open-source SDK that helps developers collect privacy-first
              browser trust signals — browser integrity, automation detection, webcam
              integrity, and passive liveness.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={onTryDemo} className="btn-primary">
                <Play size={15} strokeWidth={2} />
                Run Trust Analysis
              </button>
              <a
                href="https://github.com/rafaelEt/opentrust"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GithubIcon size={15} />
                View GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden lg:block"
          >
            <LiveDemoCard triggerVerify={triggerVerify} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

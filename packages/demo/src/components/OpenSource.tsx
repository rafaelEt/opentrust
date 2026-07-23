import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, FileCode, Globe } from 'lucide-react';
import { GithubIcon } from './icons';

export function OpenSource() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900/80 border border-zinc-800 text-zinc-400 mb-5">
              <Star size={11} strokeWidth={1.5} className="text-zinc-500" />
              Open source
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
              Built in the open.
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-lg">
              OpenTrust is MIT-licensed and developed publicly on GitHub.
              No black boxes, no proprietary algorithms — fully auditable
              by the community.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-400">
                <GithubIcon size={15} />
                anomalyco/opentrust
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-400">
                <FileCode size={15} strokeWidth={1.5} className="text-zinc-500" />
                MIT License
              </div>
            </div>

            <a
              href="https://github.com/anomalyco/opentrust"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex"
            >
              <GithubIcon size={15} />
              Contribute on GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bento-card"
          >
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-800/80">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <GitFork size={18} strokeWidth={1.5} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-100">Contributing</div>
                <p className="text-xs text-zinc-500 mt-0.5">We welcome PRs, issues, and discussions</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: FileCode, text: 'Improve detection patterns and fingerprints' },
                { icon: BookOpen, text: 'Write documentation and translations' },
                { icon: Globe, text: 'Add support for more browsers and platforms' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-zinc-400">
                    <Icon size={14} strokeWidth={1.5} className="text-zinc-600 shrink-0" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

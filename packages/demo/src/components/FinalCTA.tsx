import { motion } from 'framer-motion';
import { GithubIcon } from './icons';

export function FinalCTA() {
  return (
    <section className="relative py-28 lg:py-36 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 mb-5 leading-[1.1]">
            Build smarter{' '}
            <span className="gradient-text">risk engines.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
            OpenTrust is open source, MIT-licensed, and ready to integrate.
            Add browser trust signals to your stack today.
          </p>

          <div className="flex justify-center">
            <a
              href="https://github.com/rafaelEt/opentrust"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubIcon size={15} />
              Star on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

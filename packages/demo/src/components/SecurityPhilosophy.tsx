import { motion } from 'framer-motion';
import { Shield, Layers, Eye, GitBranch } from 'lucide-react';

export function SecurityPhilosophy() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="pill mb-4">Security philosophy</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
              One signal, not the only signal.
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed max-w-lg mb-6">
              Security is built from multiple layers. OpenTrust intentionally focuses
              on browser-side trust signals and should be combined with server-side
              verification and authentication systems.
            </p>
            <p className="text-base text-zinc-400 leading-relaxed max-w-lg">
              OpenTrust does not make security decisions. It provides signals that
              applications can combine with authentication, device reputation,
              transaction history, server-side verification, and business rules.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { icon: Layers, title: 'Defense in depth', desc: 'Trust signals complement existing security layers — not replace them.' },
              { icon: Eye, title: 'Privacy by design', desc: 'All analysis runs client-side. Raw frames never leave the device.' },
              { icon: GitBranch, title: 'Open source', desc: 'Fully auditable MIT-licensed code. No black boxes or proprietary algorithms.' },
              { icon: Shield, title: 'Honest signals', desc: 'The SDK returns confidence signals, not binary "human/bot" judgments.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} strokeWidth={1.5} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100 mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

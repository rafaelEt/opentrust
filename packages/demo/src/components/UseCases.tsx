import { motion } from 'framer-motion';
import { Shield, BarChart3, Bot, Monitor, FlaskConical, Wrench, X } from 'lucide-react';

const designedFor = [
  { icon: Shield, title: 'Fraud prevention', desc: 'Provides additional browser signals for fraud detection workflows.' },
  { icon: BarChart3, title: 'Risk scoring', desc: 'Supports risk engines with browser-side trust signals.' },
  { icon: Bot, title: 'Bot mitigation', desc: 'Helps identify automated browser behavior and scripting tools.' },
  { icon: Monitor, title: 'Browser integrity', desc: 'Exposes browser-level signals such as webdriver flags and headless detection.' },
  { icon: FlaskConical, title: 'Research', desc: 'Enables experimentation with client-side trust signals.' },
  { icon: Wrench, title: 'Developer tooling', desc: 'Provides a clean API for integrating trust signals into applications.' },
];

const notReplacement = [
  'KYC (Know Your Customer)',
  'Identity verification',
  'Enterprise liveness detection',
  'Device attestation',
  'Server-side fraud detection',
];

export function UseCases() {
  return (
    <>
      {/* Designed For */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className="pill mb-4">Designed for</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
              Browser signals for risk-aware applications.
            </h2>
            <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
              OpenTrust exposes browser-side trust signals that can be combined
              with authentication, device reputation, and server-side verification.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {designedFor.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="bento-card"
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center mb-3">
                    <Icon size={16} strokeWidth={1.5} className="text-zinc-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Not a Replacement For */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="bento-card border-zinc-800/60 bg-zinc-900/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <X size={15} strokeWidth={1.5} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">Not a replacement for</h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {notReplacement.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

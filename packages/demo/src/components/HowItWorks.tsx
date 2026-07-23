import { motion } from 'framer-motion';
import { Shield, Cpu, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: Shield,
    num: '01',
    title: 'Collect privacy-safe signals',
    desc: 'The SDK requests camera or microphone access and captures anonymized metadata — never raw frames.',
  },
  {
    icon: Cpu,
    num: '02',
    title: 'Analyze trust signals locally',
    desc: 'Browser automation checks, frame integrity analysis, and passive liveness run entirely client-side.',
  },
  {
    icon: BarChart3,
    num: '03',
    title: 'Receive a trust score',
    desc: 'Your app receives a trust score (0–1) with detailed signal breakdowns. No data leaves the device.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <div className="pill mb-4">How it works</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            Collect trust signals in three steps.
          </h2>
          <p className="text-base text-zinc-400 max-w-xl leading-relaxed">
            Privacy-first browser analysis that integrates in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                >
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                        <Icon size={17} strokeWidth={1.5} className="text-indigo-400" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/30 to-transparent min-h-[3rem] mt-2" />
                      )}
                    </div>
                    <div className="pb-10">
                      <div className="text-xs font-mono text-zinc-500 mb-1.5">{step.num}</div>
                      <h3 className="text-lg font-semibold text-zinc-100 mb-1.5">{step.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="lg:mt-2"
          >
            <div className="code-window max-w-md">
              <div className="code-header">
                <span>result.json</span>
                <span className="text-zinc-600">{'{'} 1 field {'}'}</span>
              </div>
              <pre className="p-4 font-mono text-sm leading-6 text-zinc-200 overflow-x-auto">
                <span className="text-zinc-500">{'{'}</span>
                {'\n'}  <span className="text-indigo-300">"trustScore"</span>: <span className="text-emerald-300">0.87</span>,
                {'\n'}  <span className="text-zinc-500">// signals, timestamp...</span>
                {'\n'}<span className="text-zinc-500">{'}'}</span>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Terminal, Download, Cpu, FileCode2, Lock } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Zero raw data upload',
    desc: 'All processing completes client-side. No images or video ever reach a server.',
  },
  {
    icon: Download,
    title: 'Two-line integration',
    desc: 'Import, call verify(), read the score. That\'s it.',
  },
  {
    icon: Cpu,
    title: 'Framework-agnostic',
    desc: 'Vanilla JS, React, Vue, Svelte — works everywhere.',
  },
  {
    icon: FileCode2,
    title: 'Fully typed',
    desc: 'TypeScript-first with complete type definitions.',
  },
];

export function DeveloperSection() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="pill mb-4">For developers</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            Built for developers.
          </h2>
          <p className="text-base text-zinc-400 max-w-xl leading-relaxed">
            Install, import, and start collecting trust signals in minutes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Terminal install */}
            <div className="code-window">
              <div className="code-header">
                <div className="flex items-center gap-2">
                  <Terminal size={12} strokeWidth={1.5} />
                  <span>terminal</span>
                </div>
              </div>
              <pre className="p-4 font-mono text-sm leading-6 text-zinc-200">
                <span className="text-zinc-500">$</span> npm install opentrust-sdk
              </pre>
            </div>

            {/* Code example */}
            <div className="code-window">
              <div className="code-header">
                <div className="flex items-center gap-2">
                  <FileCode2 size={12} strokeWidth={1.5} />
                  <span>app.ts</span>
                </div>
              </div>
              <pre className="p-4 font-mono text-sm leading-6 text-zinc-200 overflow-x-auto">
                <span className="text-zinc-500">import</span>{' '}<span className="text-zinc-200">{'{'} OpenTrust {'}'}</span>{' '}<span className="text-zinc-500">from</span>{' '}<span className="text-emerald-300">"opentrust-sdk"</span>
                {'\n'}
                {'\n'}<span className="text-zinc-500">const</span> result <span className="text-zinc-500">=</span> <span className="text-zinc-500">await</span> OpenTrust.verify({'{'}
                {'\n'}  camera: <span className="text-indigo-300">true</span>,
                {'\n'}{'}'});
                {'\n'}
                {'\n'}console.log(result.trustScore);
                {'\n'}<span className="text-zinc-500">//</span> <span className="text-zinc-500">0.87</span>
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="bento-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center shrink-0">
                      <Icon size={15} strokeWidth={1.5} className="text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-100 mb-1">{f.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
                    </div>
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

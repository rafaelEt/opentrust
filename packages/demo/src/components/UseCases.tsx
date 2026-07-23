import { motion } from 'framer-motion';
import { CreditCard, Video, ClipboardCheck, MessageCircle, Store, Heart } from 'lucide-react';

const cases = [
  { icon: CreditCard, title: 'Secure payments', desc: 'Verify the person authorizing a payment is a real human.' },
  { icon: Video, title: 'Video meetings', desc: 'Ensure participants are present, not deepfakes or recordings.' },
  { icon: ClipboardCheck, title: 'Remote interviews', desc: 'Confirm candidates are who they say they are.' },
  { icon: MessageCircle, title: 'Online communities', desc: 'Prevent bots and fake accounts from infiltrating.' },
  { icon: Store, title: 'Marketplaces', desc: 'Reduce fake sellers and fraudulent transactions.' },
  { icon: Heart, title: 'Dating platforms', desc: 'Verify genuine profiles and reduce catfishing.' },
];

export function UseCases() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="pill mb-4">Use cases</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            Where human verification matters.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((item, i) => {
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
      </div>
    </section>
  );
}

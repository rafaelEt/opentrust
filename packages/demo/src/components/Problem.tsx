import { motion } from 'framer-motion';
import { Users, Bot, Ban, MessageSquare } from 'lucide-react';

const items = [
  {
    icon: Users,
    title: 'Fake meetings',
    desc: 'Deepfake participants join video calls to impersonate executives and steal information.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    icon: Bot,
    title: 'AI accounts',
    desc: 'Bots with AI-generated faces create fake profiles on social and dating platforms.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: Ban,
    title: 'Automated fraud',
    desc: 'Headless browsers and virtual cameras circumvent traditional identity checks.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    icon: MessageSquare,
    title: 'Fake reviews',
    desc: 'Synthetic identities flood marketplaces with fraudulent reviews and ratings.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

export function Problem() {
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
          <div className="pill mb-4">The problem</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            AI changed the internet.
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
            A face and voice used to be proof of identity. Now AI can generate
            realistic faces, voices, and conversations — making it impossible
            to know who's real.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="bento-card"
              >
                <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.border} border flex items-center justify-center mb-3`}>
                  <Icon size={15} strokeWidth={1.5} className={item.color} />
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

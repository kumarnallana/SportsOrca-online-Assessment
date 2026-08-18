"use client";

import { Smile, Frown, Meh, BarChart2, Activity, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function StatsGrid({ stats }) {
  if (!stats) return null;

  const cards = [
    { title: 'Total Posts', value: stats.total, icon: Hash, color: 'text-blue-400' },
    { title: 'Positive', value: `${stats.positive} (${stats.positivePercent}%)`, icon: Smile, color: 'text-emerald-400' },
    { title: 'Neutral', value: `${stats.neutral} (${stats.neutralPercent}%)`, icon: Meh, color: 'text-slate-400' },
    { title: 'Negative', value: `${stats.negative} (${stats.negativePercent}%)`, icon: Frown, color: 'text-rose-400' },
    { title: 'Avg Sentiment', value: stats.averageScore, icon: Activity, color: 'text-indigo-400' },
    { title: 'Avg Reddit Score', value: stats.averageRedditScore, icon: BarChart2, color: 'text-amber-400' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {cards.map((card, i) => (
        <motion.div key={i} variants={item} className="flex items-center gap-4 rounded-xl border border-white/5 bg-zinc-900/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-white/10 hover:bg-zinc-900/80 hover:shadow-md">
          <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5", card.color)}>
            <card.icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400">{card.title}</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-100">{card.value}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

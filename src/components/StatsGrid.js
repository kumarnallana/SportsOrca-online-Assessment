"use client";

import { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart2, Activity, Layers3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

function AnimatedNumber({ value, isFloat = false }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  });
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = isFloat ? latest.toFixed(2) : Math.round(latest);
      }
    });
  }, [springValue, isFloat]);

  return <span ref={ref}>{isFloat ? '0.00' : '0'}</span>;
}

export function StatsGrid({ stats }) {
  if (!stats) return null;

  const cards = [
    { 
      title: 'Total Posts', 
      value: stats.total, 
      subtext: 'analyzed',
      icon: Layers3, 
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    { 
      title: 'Positive', 
      value: stats.positive, 
      subtext: `${stats.positivePercent}%`,
      icon: TrendingUp, 
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    { 
      title: 'Neutral', 
      value: stats.neutral, 
      subtext: `${stats.neutralPercent}%`,
      icon: Minus, 
      color: 'text-slate-400',
      bg: 'bg-slate-500/10'
    },
    { 
      title: 'Negative', 
      value: stats.negative, 
      subtext: `${stats.negativePercent}%`,
      icon: TrendingDown, 
      color: 'text-rose-400',
      bg: 'bg-rose-500/10'
    },
    { 
      title: 'Avg Sentiment', 
      value: stats.averageScore, 
      isFloat: true,
      subtext: 'score',
      icon: Activity, 
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    { 
      title: 'Avg Reddit Score', 
      value: stats.averageRedditScore, 
      subtext: 'upvotes',
      icon: BarChart2, 
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
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
        <motion.div key={i} variants={item} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 p-6 transition-all hover:border-white/10 hover:bg-slate-800/80">
          <div className="flex items-center gap-4">
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", card.bg, card.color)}>
              <card.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{card.title}</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <p className="text-2xl font-bold tracking-tight text-white">
                  <AnimatedNumber value={card.value} isFloat={card.isFloat} />
                </p>
                {card.subtext && (
                  <span className="text-sm font-medium text-slate-500">{card.subtext}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

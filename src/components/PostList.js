"use client";

import { useState } from 'react';
import { ExternalLink, MessageCircle, ArrowUp, TrendingUp, Minus, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function PostList({ posts }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('score_desc');

  if (!posts || posts.length === 0) return null;

  // Filter
  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.sentiment.label === filter;
  });

  // Sort
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sort === 'score_desc') return b.score - a.score;
    if (sort === 'sentiment_desc') return b.sentiment.score - a.sentiment.score;
    if (sort === 'sentiment_asc') return a.sentiment.score - b.sentiment.score;
    return 0;
  });

  const getSentimentStyle = (label) => {
    switch (label) {
      case 'positive': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', Icon: TrendingUp };
      case 'negative': return { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', Icon: TrendingDown };
      default: return { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', Icon: Minus };
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All', count: posts.length },
    { id: 'positive', label: 'Positive', count: posts.filter(p => p.sentiment.label === 'positive').length },
    { id: 'neutral', label: 'Neutral', count: posts.filter(p => p.sentiment.label === 'neutral').length },
    { id: 'negative', label: 'Negative', count: posts.filter(p => p.sentiment.label === 'negative').length },
  ];

  return (
    <div className="mt-16">
      <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Hot Posts <span className="text-slate-400 font-normal">({filteredPosts.length})</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Segmented Control Filter */}
          <div className="flex p-1 bg-slate-800/80 rounded-xl border border-white/5">
            {filterTabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors outline-none",
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-filter-tab"
                      className="absolute inset-0 bg-slate-700 rounded-lg shadow-sm border border-white/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.label}
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded-md bg-slate-900/50",
                      isActive ? "text-slate-300" : "text-slate-500"
                    )}>
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/5 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="score_desc">Highest Reddit Score</option>
            <option value="sentiment_desc">Highest Sentiment</option>
            <option value="sentiment_asc">Lowest Sentiment</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {/* We use layout to smoothly reposition cards when filtered, but we don't animate the initial mount of all 50 to respect performance */}
        <AnimatePresence mode="popLayout">
          {sortedPosts.map((post) => {
            const { color, bg, border, Icon } = getSentimentStyle(post.sentiment.label);
            return (
              <motion.div 
                key={post.id} 
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-800/40 p-5 sm:flex-row sm:items-start transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span className="font-medium">u/{post.author || 'unknown'}</span>
                    <span>•</span>
                    <span>{new Date(post.created * 1000).toLocaleDateString()}</span>
                  </div>
                  <a 
                    href={post.url || `https://reddit.com${post.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 block text-[17px] font-semibold leading-snug text-white transition-colors group-hover:text-blue-400"
                  >
                    {post.title}
                  </a>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ArrowUp className="h-4 w-4" /> {post.score}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="h-4 w-4" /> {post.numComments}
                    </span>
                    {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
                      <span className="text-slate-500">Includes media</span>
                    )}
                  </div>
                </div>
                
                <div className="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-3">
                  <div className={cn("inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize", bg, color, border)}>
                    <Icon className="h-3.5 w-3.5" />
                    {post.sentiment.label}
                    <span className="opacity-60 ml-1 font-mono">({post.sentiment.score > 0 ? '+' : ''}{post.sentiment.score})</span>
                  </div>
                  
                  <a 
                    href={`https://reddit.com${post.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-white/5 text-slate-400 opacity-0 transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100 focus:opacity-100"
                    title="View on Reddit"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {sortedPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="rounded-2xl border border-white/5 border-dashed p-12 text-center text-slate-400"
          >
            <p>No posts match the selected filter.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

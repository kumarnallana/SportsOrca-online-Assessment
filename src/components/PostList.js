"use client";

import { useState } from 'react';
import { ExternalLink, MessageCircle, ArrowUpCircle } from 'lucide-react';
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

  const getSentimentColor = (label) => {
    switch (label) {
      case 'positive': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
      case 'negative': return 'text-rose-400 border-rose-400/20 bg-rose-400/10';
      default: return 'text-slate-400 border-slate-400/20 bg-slate-400/10';
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Hot Posts ({filteredPosts.length})
        </h2>
        
        <div className="flex flex-wrap gap-4">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Sentiment</option>
            <option value="positive">Positive Only</option>
            <option value="neutral">Neutral Only</option>
            <option value="negative">Negative Only</option>
          </select>
          
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="score_desc">Highest Reddit Score</option>
            <option value="sentiment_desc">Highest Sentiment</option>
            <option value="sentiment_asc">Lowest Sentiment</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {sortedPosts.map((post) => (
            <motion.div 
              key={post.id} 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col gap-4 rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-all hover:border-white/10 hover:bg-zinc-900/60 sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <a 
                  href={post.url || `https://reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 block text-lg font-medium leading-snug text-zinc-100 transition-colors hover:text-blue-400"
                >
                  {post.title}
                </a>
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <ArrowUpCircle className="h-4 w-4" /> {post.score}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {post.numComments}
                  </span>
                  <span>by u/{post.author || 'unknown'}</span>
                  {post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && (
                    <span className="text-zinc-500">Includes media</span>
                  )}
                </div>
              </div>
              
              <div className="flex shrink-0 items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-2">
                <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize transition-colors", getSentimentColor(post.sentiment.label))}>
                  {post.sentiment.label}
                </div>
                <div className="text-xs text-zinc-500">
                  Score: {post.sentiment.score}
                </div>
                <a 
                  href={`https://reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 hidden text-zinc-500 transition-colors hover:text-white sm:block"
                  title="View on Reddit"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {sortedPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="rounded-xl border border-white/5 border-dashed p-8 text-center text-zinc-500"
          >
            No posts match your filters.
          </motion.div>
        )}
      </div>
    </div>
  );
}

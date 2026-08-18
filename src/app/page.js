"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { analyzeTitle, aggregateSentiment } from '@/lib/sentiment';
import { SearchSection } from '@/components/SearchSection';
import { StatsGrid } from '@/components/StatsGrid';
import { SentimentOverview } from '@/components/SentimentOverview';
import { PostList } from '@/components/PostList';
import { AlertCircle, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSubreddit = searchParams.get('subreddit') || '';

  const [subreddit, setSubreddit] = useState(initialSubreddit);
  
  // Loading states
  const [isFetching, setIsFetching] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  
  const [error, setError] = useState(null);
  
  // Data state
  const [data, setData] = useState(null);
  const [staleData, setStaleData] = useState(null);

  // Abort controller reference for stale request protection
  const abortControllerRef = useRef(null);

  // Trigger search if URL has initial param but no data
  useEffect(() => {
    if (initialSubreddit && !data && !isFetching) {
      handleSearch(initialSubreddit);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async (sub) => {
    if (!sub) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Update URL
    router.push(`/?subreddit=${encodeURIComponent(sub)}`, { scroll: false });

    setSubreddit(sub);
    setIsFetching(true);
    setLoadingStage('Fetching subreddit data...');
    setError(null);
    
    // Move current data to stale so it stays on screen
    if (data) {
      setStaleData(data);
      setData(null);
    }

    try {
      const response = await fetch(`/api/subreddit?name=${encodeURIComponent(sub)}`, {
        signal: abortControllerRef.current.signal
      });
      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.message || 'Failed to fetch data.');
      }

      setLoadingStage('Analyzing conversation...');
      
      // Artificial short delay to allow the stage text to be readable
      await new Promise(r => setTimeout(r, 250));

      // Perform sentiment analysis client-side
      const enrichedPosts = result.posts.map(post => ({
        ...post,
        sentiment: analyzeTitle(post.title)
      }));

      const stats = aggregateSentiment(enrichedPosts);

      setLoadingStage('Preparing insights...');
      await new Promise(r => setTimeout(r, 150));

      setData({
        subreddit: sub,
        source: result.source,
        count: result.count,
        posts: enrichedPosts,
        stats
      });
      
      setStaleData(null);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Search aborted');
        return;
      }
      setError(err.message);
      setStaleData(null);
    } finally {
      setIsFetching(false);
      setLoadingStage('');
    }
  };

  const hasNoData = !data && !staleData && !isFetching && !error;

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      <SearchSection onSearch={handleSearch} initialValue={subreddit} isFetching={isFetching} />

      <div className="mx-auto mt-16 max-w-5xl">
        <AnimatePresence mode="wait">
          {hasNoData && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center space-y-4 py-24 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/50 border border-white/5 shadow-inner">
                <BarChart3 className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-200">No subreddit analyzed yet</h3>
                <p className="mt-2 text-slate-400">Enter a subreddit above to begin analyzing the conversation.</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-8 text-center"
            >
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-rose-400" />
              <h3 className="text-lg font-semibold text-rose-300">Something went wrong</h3>
              <p className="text-rose-400/80 mt-1">{error}</p>
            </motion.div>
          )}

          {(data || staleData) && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Stale Data Overlay */}
              {staleData && isFetching && (
                <div className="absolute inset-0 z-10 flex items-start justify-center pt-24 backdrop-blur-[2px] bg-slate-900/40 rounded-xl transition-all duration-300">
                  <div className="flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-400 shadow-xl backdrop-blur-md">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                    {loadingStage}
                  </div>
                </div>
              )}

              <div className={staleData && isFetching ? 'opacity-50 grayscale-[30%] pointer-events-none transition-all duration-500' : 'transition-all duration-500'}>
                {data?.count === 0 || staleData?.count === 0 ? (
                  <div className="rounded-xl border border-white/5 bg-slate-800/50 p-12 text-center text-slate-300">
                    <p>No valid posts found for this subreddit.</p>
                  </div>
                ) : (
                  <>
                    {(data?.source === 'mock' || staleData?.source === 'mock') && (
                      <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-400/90">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p>
                          <strong className="font-semibold text-amber-400">Demo Mode Active:</strong> You are viewing synthetic mock data because official Reddit API credentials are not configured in the environment.
                        </p>
                      </div>
                    )}
                    
                    <StatsGrid stats={data?.stats || staleData?.stats} />
                    <SentimentOverview stats={data?.stats || staleData?.stats} />
                    <PostList posts={data?.posts || staleData?.posts} />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-slate-400">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

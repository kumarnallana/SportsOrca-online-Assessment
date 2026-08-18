"use client";

import { useState } from 'react';
import { analyzeTitle, aggregateSentiment } from '@/lib/sentiment';
import { SearchSection } from '@/components/SearchSection';
import { StatsGrid } from '@/components/StatsGrid';
import { SentimentOverview } from '@/components/SentimentOverview';
import { PostList } from '@/components/PostList';
import { AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [subreddit, setSubreddit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSearch = async (sub) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setSubreddit(sub);

    try {
      const response = await fetch(`/api/subreddit?name=${encodeURIComponent(sub)}`);
      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.message || 'Failed to fetch data.');
      }

      // Perform sentiment analysis client-side
      const enrichedPosts = result.posts.map(post => ({
        ...post,
        sentiment: analyzeTitle(post.title)
      }));

      const stats = aggregateSentiment(enrichedPosts);

      setData({
        source: result.source,
        count: result.count,
        posts: enrichedPosts,
        stats
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      <SearchSection onSearch={handleSearch} isLoading={isLoading} />

      {/* States */}
      <div className="mx-auto mt-12 max-w-5xl">
        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4 py-20 text-zinc-400">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p>Fetching and analyzing {subreddit}...</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-center text-rose-400">
            <AlertCircle className="mx-auto mb-2 h-8 w-8" />
            <h3 className="text-lg font-semibold">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {data && data.count === 0 && !isLoading && !error && (
          <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-12 text-center text-zinc-400">
            <p>No valid posts found for this subreddit.</p>
          </div>
        )}

        {data && data.posts.length > 0 && !isLoading && !error && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {data.source === 'mock' && (
              <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
                <strong>Demo Mode:</strong> You are viewing synthetic mock data because Reddit API credentials are not configured.
              </div>
            )}
            
            <StatsGrid stats={data.stats} />
            <SentimentOverview stats={data.stats} />
            <PostList posts={data.posts} />
          </div>
        )}
      </div>
    </div>
  );
}

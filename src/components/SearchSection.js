"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchSection({ onSearch, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
        Analyze the Vibe
      </h1>
      <p className="mb-8 text-lg text-zinc-400">
        Enter a subreddit name to see the mood behind its hottest posts.
      </p>

      <form onSubmit={handleSubmit} className="relative flex items-center shadow-2xl shadow-blue-900/20 rounded-full border border-white/10 bg-zinc-900/50 p-2 backdrop-blur-xl transition-all focus-within:border-blue-500/50 focus-within:bg-zinc-900/80">
        <div className="pointer-events-none pl-4 text-zinc-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. technology, reactjs, webdev"
          className="w-full bg-transparent px-4 py-3 text-lg text-white outline-none placeholder:text-zinc-600"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-zinc-400">
        <span>Try:</span>
        {['technology', 'programming', 'webdev', 'reactjs'].map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => {
              setInput(sub);
              onSearch(sub);
            }}
            className="rounded-full bg-zinc-800/50 px-3 py-1 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            r/{sub}
          </button>
        ))}
      </div>
    </div>
  );
}

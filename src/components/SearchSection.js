"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export function SearchSection({ onSearch, isFetching, initialValue = '' }) {
  const [input, setInput] = useState(initialValue);

  // Keep input in sync with external changes (e.g. URL query params)
  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && input.trim() !== initialValue) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-slate-50 to-slate-400">
        Analyze the Vibe
      </h1>
      <p className="mb-10 text-lg text-slate-300">
        Enter a subreddit name to understand the mood behind its hottest conversations.
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="relative flex items-center shadow-2xl shadow-blue-900/5 rounded-full border border-white/5 bg-slate-800/40 p-2 backdrop-blur-xl transition-all focus-within:border-blue-500/40 focus-within:bg-slate-800/80 focus-within:ring-4 focus-within:ring-blue-500/10"
      >
        <div className="pointer-events-none pl-5 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <div className="pointer-events-none pl-3 text-slate-400 font-medium select-none">
          r/
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="technology, reactjs, webdev"
          className="w-full bg-transparent px-1 py-3 text-lg font-medium text-white outline-none placeholder:text-slate-500 placeholder:font-normal"
          disabled={isFetching}
          spellCheck={false}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isFetching || !input.trim() || input.trim() === initialValue}
          className="rounded-full bg-blue-600 px-7 py-3 font-medium text-white transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:hover:bg-blue-600"
        >
          Analyze
        </button>
      </form>

      <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-sm text-slate-400">
        <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold mr-1">Try</span>
        {['technology', 'programming', 'webdev', 'reactjs'].map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => {
              setInput(sub);
              onSearch(sub);
            }}
            className="rounded-full border border-white/5 bg-slate-800/50 px-4 py-1.5 transition-all hover:border-white/10 hover:bg-slate-700 hover:text-slate-100 active:scale-95"
          >
            {sub}
          </button>
        ))}
      </div>
    </div>
  );
}

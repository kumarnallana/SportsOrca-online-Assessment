import './globals.css';
import { Inter } from 'next/font/google';
import { LenisProvider } from '@/components/LenisProvider';
import { Activity } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Subreddit Vibe Check | Real-Time Reddit Sentiment Analytics',
  description: 'Understand the collective mood and sentiment behind the hottest conversations on Reddit.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-900 text-slate-50 antialiased selection:bg-blue-500/30`}>
        <LenisProvider>
          <div className="relative flex min-h-screen flex-col">
            {/* Subtle background radial gradient */}
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-900 opacity-80" aria-hidden="true" />
            
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-900/80 backdrop-blur-xl transition-all">
              <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner" aria-hidden="true">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[15px] font-semibold tracking-tight text-slate-50">The Subreddit Vibe Check</span>
                </div>

                <a
                  href="https://github.com/kumarnallana/SportsOrca-online-Assessment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/10 hover:bg-slate-700 hover:text-white focus-ring"
                  aria-label="View Source Code on GitHub"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="hidden sm:inline">GitHub Repository</span>
                </a>
              </div>
            </header>
            
            <main className="flex-1" id="main-content">
              {children}
            </main>
            
            <footer className="border-t border-white/5 py-8 mt-16 text-center text-sm text-slate-400">
              <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4">
                <p className="font-medium text-slate-300">The Subreddit Vibe Check</p>
                <p className="text-xs text-slate-500">Built with Next.js App Router, D3.js, Framer Motion, and AFINN Sentiment Analysis.</p>
              </div>
            </footer>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}

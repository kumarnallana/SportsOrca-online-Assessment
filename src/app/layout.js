import './globals.css';
import { Inter } from 'next/font/google';
import { LenisProvider } from '@/components/LenisProvider';
import { Activity } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Subreddit Vibe Check',
  description: 'Understand the mood behind the hottest conversations on Reddit.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-900 text-slate-50 antialiased selection:bg-blue-500/30`}>
        <LenisProvider>
          <div className="relative flex min-h-screen flex-col">
            {/* Extremely subtle background gradient */}
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-900 opacity-80"></div>
            
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-900/80 backdrop-blur-xl transition-all">
              <div className="container mx-auto flex h-14 max-w-5xl items-center px-4 md:px-8">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[15px] font-semibold tracking-tight text-slate-50">The Subreddit Vibe Check</span>
                </div>
              </div>
            </header>
            
            <main className="flex-1">
              {children}
            </main>
            
            <footer className="border-t border-white/5 py-8 mt-12 text-center text-sm text-slate-400">
              <div className="flex flex-col items-center justify-center gap-2">
                <p>The Subreddit Vibe Check</p>
                <p className="text-xs text-slate-500">Built for conversation analytics.</p>
              </div>
            </footer>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}

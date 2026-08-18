import './globals.css';
import { Inter } from 'next/font/google';
import { LenisProvider } from '@/components/LenisProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Subreddit Vibe Check',
  description: 'Understand the mood behind the hottest conversations on Reddit.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0a0a0a] text-zinc-100 antialiased selection:bg-blue-500/30`}>
        <LenisProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
            
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
              <div className="container mx-auto flex h-16 max-w-5xl items-center px-4 md:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-zinc-100">The Subreddit Vibe Check</span>
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">
              <p>Built for the assignment. Not affiliated with Reddit.</p>
            </footer>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}

import { Package } from 'lucide-react';
import { GithubIcon } from './icons';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/70 border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10"/>
            <path d="M12 6a4 4 0 1 0 4 4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <span className="font-semibold text-sm tracking-tight text-zinc-100">OpenTrust</span>
        </a>

        <nav className="flex items-center gap-5">
          <a
            href="https://github.com/anomalyco/opentrust"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href="https://npmjs.com/package/opentrust-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700/50"
          >
            <Package size={12} strokeWidth={1.5} />
            npm
          </a>
        </nav>
      </div>
    </header>
  );
}

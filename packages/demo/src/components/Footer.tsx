import { Package } from 'lucide-react';
import { GithubIcon } from './icons';

export function Footer() {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10"/>
            <path d="M12 6a4 4 0 1 0 4 4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <span className="text-sm text-zinc-600">OpenTrust — MIT License</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-zinc-600">
          <a href="https://github.com/rafaelEt/opentrust" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors inline-flex items-center gap-1">
            <GithubIcon size={12} />
            GitHub
          </a>
          <a href="https://npmjs.com/package/opentrust-sdk" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors inline-flex items-center gap-1">
            <Package size={12} strokeWidth={1.5} />
            npm
          </a>
          <span className="text-zinc-700">Privacy-first &bull; Open-source</span>
        </div>
      </div>
    </footer>
  );
}

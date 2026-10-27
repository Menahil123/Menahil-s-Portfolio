import React from 'react';
import { Download, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="flex flex-col border-b border-white/10 bg-black/80 select-none">
      <div className="flex items-center justify-between gap-4 sm:gap-8 px-3 sm:px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            sound.playFloppySeek();
            setActiveTab('about');
          }}
          className="text-base sm:text-lg font-bold tracking-wider text-phosphor whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500">[SYS]</span>
          <span>{PERSONAL_INFO.name.toUpperCase()}</span>
        </a>

        {/* Zone 2: 4-6 clean single-line text navigation links for desktop */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-mono" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playFloppySeek();
                  setActiveTab(item.id);
                }}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-phosphor font-bold underline underline-offset-4'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                [{item.label}]
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Menahil_Dastgir_CV.pdf"
            onClick={() => {
              sound.playChirp(1200);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-black bg-emerald-400 hover:bg-emerald-300 rounded-sm transition-colors whitespace-nowrap shrink-0 shadow-[0_0_8px_rgba(51,255,51,0.5)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD CV</span>
          </a>
        </div>
      </div>

      {/* Mobile scrollable tab strip */}
      <nav className="md:hidden flex items-center gap-1 px-3 py-1.5 border-t border-white/5 overflow-x-auto text-xs font-mono" aria-label="Mobile Navigation">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playFloppySeek();
                setActiveTab(item.id);
              }}
              className={`px-2.5 py-1 whitespace-nowrap shrink-0 rounded transition-colors ${
                isActive
                  ? 'bg-emerald-500/20 text-phosphor font-bold border border-phosphor/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

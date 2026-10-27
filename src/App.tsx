/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CrtBezel } from './components/CrtBezel';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { TerminalSection } from './components/TerminalSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { PhosphorColor } from './types';
import { sound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [theme, setTheme] = useState<PhosphorColor>('green');
  const [scanlines, setScanlines] = useState<boolean>(true);
  const [curved, setCurved] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.25);
  const [isPowered, setIsPowered] = useState<boolean>(true);
  const [degaussActive, setDegaussActive] = useState<boolean>(false);

  // Sync body data-theme attribute
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleDegauss = () => {
    setDegaussActive(true);
    setTimeout(() => {
      setDegaussActive(false);
    }, 450);
  };

  return (
    <div className={degaussActive ? 'animate-pulse brightness-150 contrast-125' : ''}>
      <CrtBezel
        theme={theme}
        setTheme={setTheme}
        scanlines={scanlines}
        setScanlines={setScanlines}
        curved={curved}
        setCurved={setCurved}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        volume={volume}
        setVolume={setVolume}
        isPowered={isPowered}
        setIsPowered={setIsPowered}
        onDegauss={handleDegauss}
      >
        <div className="w-full min-h-[640px] sm:min-h-[760px] bg-black/95 flex flex-col justify-between">
          <div>
            {/* Top Navigation */}
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Active Section Content */}
            <main>
              {activeTab === 'about' && <HeroSection onNavigate={setActiveTab} />}
              {activeTab === 'projects' && <ProjectsSection />}
              {activeTab === 'skills' && <SkillsSection />}
              {activeTab === 'terminal' && <TerminalSection setTheme={setTheme} onNavigate={setActiveTab} />}
              {activeTab === 'education' && <EducationSection />}
              {activeTab === 'contact' && <ContactSection />}
            </main>
          </div>

          {/* CRT Screen Footer Status Bar */}
          <footer className="mt-8 px-4 sm:px-6 py-2 border-t border-white/10 bg-black/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-2 select-none">
            <div className="flex items-center gap-3">
              <span className="text-phosphor">MENAHIL DASTGIR · BSIT</span>
              <span>·</span>
              <span>FAISALABAD, PAKISTAN</span>
            </div>

            <div className="flex items-center gap-4">
              <span>SENTINEL-NET CAPSTONE</span>
              <span className="hidden sm:inline">AWS EC2 · LINUX · DEVOPS</span>
              <span className="text-slate-400">STATUS: READY</span>
            </div>
          </footer>
        </div>
      </CrtBezel>
    </div>
  );
}

import React from 'react';
import { Volume2, VolumeX, Sparkles, Monitor, Radio, Zap } from 'lucide-react';
import { PhosphorColor } from '../types';
import { sound } from '../utils/sound';

interface CrtBezelProps {
  children: React.ReactNode;
  theme: PhosphorColor;
  setTheme: (theme: PhosphorColor) => void;
  scanlines: boolean;
  setScanlines: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  curved: boolean;
  setCurved: (curved: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  volume: number;
  setVolume: (vol: number) => void;
  isPowered: boolean;
  setIsPowered: (powered: boolean | ((prev: boolean) => boolean)) => void;
  onDegauss: () => void;
}

export const CrtBezel: React.FC<CrtBezelProps> = ({
  children,
  theme,
  setTheme,
  scanlines,
  setScanlines,
  curved,
  setCurved,
  soundEnabled,
  setSoundEnabled,
  volume,
  setVolume,
  isPowered,
  setIsPowered,
  onDegauss,
}) => {
  return (
    <div className="min-h-screen bg-[#07080a] text-slate-300 py-2 sm:py-6 px-1 sm:px-4 flex flex-col items-center justify-start select-none">
      {/* Outer Monitor Chassis */}
      <div className="w-full max-w-[1440px] bg-gradient-to-b from-[#24262e] via-[#1c1d24] to-[#121318] rounded-2xl sm:rounded-3xl p-2 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] border border-[#363844] flex flex-col">
        
        {/* Chassis Top Bar with Brand Badge & Ventilation */}
        <div className="flex items-center justify-between pb-3 px-2 sm:px-4 border-b border-black/40 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest text-slate-200 text-sm sm:text-base flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-xs shadow-[0_0_6px_#10b981]" />
              DASTGIR·SYSTEMS 486
            </span>
            <span className="hidden md:inline-block text-[11px] text-slate-500 tracking-wider">
              MULTISYNC HIGH-RESOLUTION COLOR CRT
            </span>
          </div>

          {/* Air Vents Graphic */}
          <div className="hidden lg:flex items-center gap-1 text-slate-600">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="inline-block w-1 h-3 bg-black/60 rounded-xs" />
            ))}
          </div>

          {/* Quick Hardware Indicators */}
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline font-mono text-slate-400">
              REFRESH: <span className="text-slate-200">75Hz</span>
            </span>
            <span className="font-mono text-slate-400">
              RESOLUTION: <span className="text-slate-200">1024×768</span>
            </span>
          </div>
        </div>

        {/* CRT Glass Bezel Area */}
        <div className="relative mt-3 sm:mt-4 p-1 sm:p-3 bg-gradient-to-b from-[#0f1014] to-[#08090b] rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[#15161c] shadow-[inset_0_4px_16px_rgba(0,0,0,0.9)]">
          
          {/* Inner Display Tube */}
          <div
            className={`relative overflow-hidden transition-all duration-300 min-h-[640px] sm:min-h-[780px] bg-black ${
              curved ? 'rounded-2xl sm:rounded-3xl shadow-[inset_0_0_90px_rgba(0,0,0,0.95)]' : 'rounded-lg'
            }`}
          >
            {isPowered ? (
              <div className="relative w-full h-full text-slate-100 crt-flicker">
                {children}

                {/* CRT Scanline Overlay */}
                {scanlines && (
                  <div
                    className="absolute inset-0 crt-scanlines pointer-events-none z-40"
                    aria-hidden="true"
                  />
                )}

                {/* CRT Curved Glass Vignette Shadow */}
                {curved && (
                  <div
                    className="absolute inset-0 crt-vignette pointer-events-none z-40"
                    aria-hidden="true"
                  />
                )}
              </div>
            ) : (
              /* CRT Powered Off Screen */
              <div className="w-full h-[640px] flex flex-col items-center justify-center text-center p-8 bg-[#040507]">
                <div className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center mb-4 text-slate-700">
                  <Monitor className="w-8 h-8" />
                </div>
                <h3 className="text-slate-400 font-mono text-lg font-bold">MONITOR IN STANDBY / POWER OFF</h3>
                <p className="text-slate-600 font-mono text-xs mt-2 max-w-sm">
                  The CRT tube cathode heater has cooled down. Press the power switch on the bottom control panel to re-energize the display.
                </p>
                <button
                  onClick={() => {
                    sound.playKeyClick();
                    setIsPowered(true);
                  }}
                  className="mt-6 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-mono rounded tracking-wider uppercase shadow-md transition-colors"
                >
                  Power On System
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Hardware Control Panel */}
        <div className="mt-3 pt-3 px-2 sm:px-4 border-t border-black/50 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          
          {/* Phosphor Color Selector Dial */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider hidden sm:inline">PHOSPHOR:</span>
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-md border border-white/5">
              {(['green', 'amber', 'cyan', 'white'] as PhosphorColor[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    sound.playKeyClick();
                    setTheme(c);
                  }}
                  className={`px-2.5 py-1 text-[11px] uppercase font-bold rounded transition-all ${
                    theme === c
                      ? 'bg-slate-700 text-white shadow-[0_0_8px_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                  style={{
                    color: theme === c ? (c === 'green' ? '#33ff33' : c === 'amber' ? '#ffb000' : c === 'cyan' ? '#00f3ff' : '#ffffff') : undefined
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* CRT Effects: Scanlines, Curve, Degauss */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                sound.playKeyClick();
                setScanlines(prev => !prev);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded border transition-colors ${
                scanlines
                  ? 'border-emerald-600/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-slate-800 bg-black/30 text-slate-500'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>SCANLINES: {scanlines ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => {
                sound.playKeyClick();
                setCurved(prev => !prev);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded border transition-colors ${
                curved
                  ? 'border-emerald-600/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-slate-800 bg-black/30 text-slate-500'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>GLASS: {curved ? 'CURVED' : 'FLAT'}</span>
            </button>

            <button
              onClick={() => {
                sound.playDegauss();
                onDegauss();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded border border-amber-800/40 bg-amber-950/20 text-amber-300 hover:bg-amber-900/40 transition-colors"
              title="Discharge magnetic buildup on CRT shadow mask"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>DEGAUSS</span>
            </button>
          </div>

          {/* Audio & Power Switches */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle & Volume */}
            <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/5">
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  sound.setEnabled(next);
                  if (next) sound.playChirp(880);
                }}
                className={`p-1 rounded ${soundEnabled ? 'text-emerald-400' : 'text-slate-600'}`}
                title="Toggle retro audio sound effects"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  sound.setVolume(val);
                  if (!soundEnabled && val > 0) {
                    setSoundEnabled(true);
                    sound.setEnabled(true);
                  }
                }}
                className="w-16 h-1 accent-emerald-500 bg-slate-700 cursor-pointer"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>

            {/* CRT Master Power Switch */}
            <button
              onClick={() => {
                sound.playKeyClick();
                setIsPowered(prev => !prev);
              }}
              className="flex items-center gap-2 px-3 py-1 bg-[#15161c] hover:bg-[#1a1b24] border border-slate-700 rounded transition-colors group"
            >
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full transition-all ${
                  isPowered
                    ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                    : 'bg-rose-900 border border-rose-700'
                }`}
              />
              <span className="text-[11px] font-bold text-slate-300">
                {isPowered ? 'PWR ON' : 'PWR OFF'}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

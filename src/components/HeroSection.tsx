import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Cpu, Activity, MapPin, Mail, Phone, Github, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { SystemStatusData } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<SystemStatusData | null>(null);

  useEffect(() => {
    fetch('/api/system-status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus(data.data);
        }
      })
      .catch(() => {
        // Fallback local status
        setStatus({
          status: 'OPERATIONAL',
          hostname: 'dastgir-workstation.nu-ml.local',
          os: 'Ubuntu 24.04 LTS (GNU/Linux 6.8.0)',
          nodeVersion: 'v22.x',
          uptimeSeconds: 1420,
          memoryUsageMb: 84,
          activeEndpointsMonitored: 14,
          packetsInspected: 128940,
          lastAnomalyCheck: new Date().toISOString()
        });
      });
  }, []);

  return (
    <section className="p-4 sm:p-8 space-y-6">
      {/* Retro BIOS / POST Initialization Header */}
      <div className="border border-white/10 bg-black/40 p-3 sm:p-4 rounded text-xs font-mono text-slate-400 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-white/5 pb-1 mb-2">
          <span>ROM BIOS (C) 1994 DASTGIR ARCHITECTURE GROUP</span>
          <span className="text-phosphor">SYSTEM HEALTH: NORMAL</span>
        </div>
        <p className="text-slate-300">
          MAIN PROCESSOR: x86_64 ARCHITECTURE · 14 ACTIVE MONITORED NODES · SENTINEL-NET DAEMON ONLINE
        </p>
        <p className="text-slate-400">
          SECURITY PROTOCOLS: TRYHACKME VERIFIED · FIREWALL: ACTIVE (UFW/IPTABLES) · AWS EC2 CLOUD RUNTIME
        </p>
      </div>

      {/* Main Headline & Intro */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>OPERATOR CALLSIGN:</span>
            <span className="text-phosphor font-bold">{PERSONAL_INFO.callsign}</span>
            <span aria-hidden="true">·</span>
            <span>{PERSONAL_INFO.location}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono tracking-tight text-phosphor leading-tight">
            {PERSONAL_INFO.name}
          </h1>

          <p className="text-base sm:text-lg font-mono text-slate-200">
            {PERSONAL_INFO.title}
          </p>
        </div>

        {/* Narrative Bio */}
        <p className="text-sm sm:text-base font-mono text-slate-300 leading-relaxed max-w-4xl">
          {PERSONAL_INFO.about}
        </p>

        {/* Quick Contact & Presence Grid */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-phosphor" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-phosphor" />
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-phosphor transition-colors">
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-phosphor" />
            <span>{PERSONAL_INFO.phone}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-phosphor" />
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-phosphor transition-colors"
            >
              github.com/{PERSONAL_INFO.githubHandle}
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              sound.playFloppySeek();
              onNavigate('projects');
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs rounded transition-all shadow-[0_0_12px_rgba(51,255,51,0.4)] cursor-pointer"
          >
            <span>EXPLORE PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playChirp(960);
              onNavigate('terminal');
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-phosphor border border-phosphor font-mono text-xs rounded transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>LAUNCH CLI TERMINAL</span>
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onNavigate('contact');
            }}
            className="px-4 py-2.5 bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white border border-white/20 font-mono text-xs rounded transition-all cursor-pointer"
          >
            <span>SEND TRANSMISSION</span>
          </button>
        </div>
      </div>

      {/* Real-Time Workstation Diagnostic Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10">
        <div className="p-3 bg-black/40 border border-white/10 rounded">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-phosphor" />
            <span>SENTINEL TELEMETRY</span>
          </div>
          <div className="text-lg font-bold font-mono text-phosphor mt-1">
            {status ? `${status.activeEndpointsMonitored} NODES` : 'ONLINE'}
          </div>
          <div className="text-[11px] font-mono text-slate-500">Real-time domain probe</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/10 rounded">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Shield className="w-3.5 h-3.5 text-phosphor" />
            <span>SECURITY LEVEL</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-200 mt-1">
            TRYHACKME LABS
          </div>
          <div className="text-[11px] font-mono text-slate-500">Firewall + Access Mgmt</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/10 rounded">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-phosphor" />
            <span>AWS CLOUD INFRA</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-200 mt-1">
            EC2 LINUX
          </div>
          <div className="text-[11px] font-mono text-slate-500">Docker & Shell Cron</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/10 rounded">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-phosphor" />
            <span>PACKETS SCANNED</span>
          </div>
          <div className="text-lg font-bold font-mono text-phosphor mt-1 tabular-nums">
            {status ? status.packetsInspected.toLocaleString() : '124,900+'}
          </div>
          <div className="text-[11px] font-mono text-slate-500">Low overhead &lt;1.4ms</div>
        </div>
      </div>
    </section>
  );
};

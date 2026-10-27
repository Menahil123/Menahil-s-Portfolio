import React, { useState } from 'react';
import { Terminal, Shield, Play, CheckCircle2, AlertTriangle, ExternalLink, Filter, Database, Cloud } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { sound } from '../utils/sound';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'systems' | 'cybersecurity' | 'cloud' | 'web'>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Sentinel Net Interactive Simulator State
  const [sentinelLogs, setSentinelLogs] = useState<string[]>([
    '[INIT] Socket listener active on eth0:53 (UDP/TCP)',
    '[READY] Agent RSS memory locked at 17.8MB',
    '[EVENT] 192.168.1.102 -> auth.secure-corp.internal (ALLOW)',
    '[EVENT] 192.168.1.108 -> cdn.kernel.org (ALLOW)'
  ]);
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);

  // Simulated Sentinel Action
  const handleSimulateSentinelQuery = (suspicious: boolean) => {
    const time = new Date().toLocaleTimeString();
    if (suspicious) {
      sound.playError();
      setIsAlertActive(true);
      const newLog = `[ALERT] ${time} ANOMALOUS DOMAIN: 192.168.1.144 -> rx9-dga-payload.biz (Entropy: 4.82 > 3.90)`;
      setSentinelLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    } else {
      sound.playChirp(1040);
      setIsAlertActive(false);
      const newLog = `[OK] ${time} ENDPOINT QUERY: 192.168.1.115 -> api.github.com (Whitelisted, 1.1ms)`;
      setSentinelLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }
  };

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="p-4 sm:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="text-xs font-mono text-slate-400">INDEX: /PROJECTS/CATALOG</div>
          <h2 className="text-xl sm:text-3xl font-bold font-mono text-phosphor mt-1">
            PROJECT SHOWCASE & CAPSTONES
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1">
            Production software, real-time monitoring daemons, and cloud infrastructure deployments.
          </p>
        </div>

        {/* Filter Controls (Functional buttons with click handlers) */}
        <div className="flex items-center gap-1 p-1 bg-black/50 border border-white/10 rounded flex-wrap">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'systems', label: 'Systems & Net' },
            { id: 'cybersecurity', label: 'Security' },
            { id: 'cloud', label: 'Cloud & DevOps' },
            { id: 'web', label: 'Web Applications' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playKeyClick();
                setFilter(cat.id as any);
              }}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                filter === cat.id
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_8px_rgba(51,255,51,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Project Spotlight: Sentinel Net */}
      <div className="border-2 border-phosphor bg-black/60 rounded-lg p-4 sm:p-6 shadow-[0_0_20px_var(--p-dim)] space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-phosphor font-bold">[LEAD FYP CAPSTONE]</span>
              <span aria-hidden="true">·</span>
              <span>Academic Final Year Project</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-bold">LIVE TELEMETRY DEMO</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-phosphor">
              Sentinel Net — Centralized Real-Time Endpoint Domain Monitoring & Alert System
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-300">
              Designed to give organizations centralized visibility and anomaly detection over endpoint domain communications without the complexity, overhead, and license costs of commercial enterprise monitoring platforms.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-950 border border-emerald-500 text-emerald-300 rounded">
              STATUS: ONLINE
            </span>
          </div>
        </div>

        {/* Highlights & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <div className="text-[11px] font-mono text-slate-400">AGENT LATENCY OVERHEAD</div>
            <div className="text-lg font-bold font-mono text-phosphor">&lt; 1.4ms</div>
            <div className="text-[11px] font-mono text-slate-500">Zero perceptible endpoint delay</div>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <div className="text-[11px] font-mono text-slate-400">DAEMON MEMORY FOOTPRINT</div>
            <div className="text-lg font-bold font-mono text-phosphor">&lt; 18MB RSS</div>
            <div className="text-[11px] font-mono text-slate-500">Optimized for constrained nodes</div>
          </div>
          <div className="p-3 bg-black/40 border border-white/10 rounded">
            <div className="text-[11px] font-mono text-slate-400">AUDIT LOGGING ENGINE</div>
            <div className="text-lg font-bold font-mono text-phosphor">MySQL Partitioned</div>
            <div className="text-[11px] font-mono text-slate-500">1.2k events/sec throughput</div>
          </div>
        </div>

        {/* Interactive Simulated Probe Console */}
        <div className="mt-4 border border-white/15 bg-black/80 rounded p-3 sm:p-4 font-mono text-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-phosphor" />
              <span className="font-bold text-slate-200">INTERACTIVE SENTINEL PROBE CONSOLE</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSimulateSentinelQuery(false)}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-200 rounded text-[11px] transition-colors cursor-pointer"
              >
                Simulate Safe Query
              </button>
              <button
                onClick={() => handleSimulateSentinelQuery(true)}
                className="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/60 rounded text-[11px] transition-colors cursor-pointer"
              >
                Trigger Suspicious Alert
              </button>
            </div>
          </div>

          {/* Stream Output */}
          <div className="space-y-1 bg-black p-2.5 rounded border border-white/5 font-mono text-[11px] max-h-36 overflow-y-auto">
            {sentinelLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('[ALERT]')
                    ? 'text-rose-400 font-bold bg-rose-950/30 px-1 py-0.5 rounded'
                    : log.includes('[INIT]') || log.includes('[READY]')
                    ? 'text-slate-400'
                    : 'text-phosphor'
                }
              >
                {log}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-1">
            <span className="text-slate-500">Technologies:</span>
            {['Python 3', 'Linux Daemons', 'Shell Scripting', 'MySQL', 'Socket Networking'].map((t) => (
              <span key={t} className="text-slate-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Other Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {filteredProjects
          .filter((p) => p.id !== 'sentinel-net')
          .map((project) => (
            <div
              key={project.id}
              className="p-4 sm:p-5 bg-black/50 border border-white/10 hover:border-phosphor/60 rounded-lg transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-phosphor font-bold">[{project.badge}]</span>
                  <span className="text-slate-500 font-mono text-[11px]">{project.liveStatus}</span>
                </div>

                <h3 className="text-lg font-bold font-mono text-slate-100">
                  {project.title}
                </h3>

                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                <ul className="text-xs font-mono text-slate-400 space-y-1 pt-1">
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-phosphor shrink-0">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  {project.technologies.map((t) => (
                    <span key={t} className="text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    sound.playKeyClick();
                    setActiveProject(project);
                  }}
                  className="w-full mt-2 py-1.5 bg-white/5 hover:bg-white/10 text-phosphor border border-phosphor-subtle rounded text-xs font-mono transition-colors cursor-pointer"
                >
                  Inspect Architecture & Specs →
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#101216] border-2 border-phosphor max-w-2xl w-full p-6 rounded-lg shadow-2xl font-mono text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-phosphor font-bold">[{activeProject.badge}]</span>
                <h3 className="text-xl font-bold text-slate-100 mt-1">{activeProject.title}</h3>
                <p className="text-slate-400 mt-0.5">{activeProject.subtitle}</p>
              </div>
              <button
                onClick={() => {
                  sound.playKeyClick();
                  setActiveProject(null);
                }}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-300 rounded cursor-pointer"
              >
                [CLOSE ×]
              </button>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {activeProject.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-phosphor uppercase">Key Implementation Highlights:</h4>
              <ul className="space-y-1.5 text-slate-300">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-phosphor">✔</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeProject.metrics && (
              <div className="grid grid-cols-3 gap-2 pt-2">
                {activeProject.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 bg-black/40 border border-white/10 rounded">
                    <div className="text-[10px] text-slate-400">{m.label}</div>
                    <div className="text-sm font-bold text-phosphor">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 mb-1.5">Technologies Employed:</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((t) => (
                  <span key={t} className="bg-black border border-white/10 px-2 py-1 text-slate-200 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  sound.playKeyClick();
                  setActiveProject(null);
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded cursor-pointer"
              >
                Acknowledge & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

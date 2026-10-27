import React, { useState } from 'react';
import { Terminal, Copy, Check, Shield, Cpu, Wrench, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    details: string;
    level: string;
    proficiency: number;
    sampleCommand?: string;
  }>(SKILL_CATEGORIES[0].skills[0]);

  const [copied, setCopied] = useState<boolean>(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Code2 className="w-4 h-4 text-phosphor" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-phosphor" />;
      case 'Cloud':
        return <Cpu className="w-4 h-4 text-phosphor" />;
      case 'Wrench':
      default:
        return <Wrench className="w-4 h-4 text-phosphor" />;
    }
  };

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    sound.playChirp(1200);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="p-4 sm:p-8 space-y-6">
      {/* Section Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-xs font-mono text-slate-400">MATRIX: /SYS/CAPABILITIES</div>
        <h2 className="text-xl sm:text-3xl font-bold font-mono text-phosphor mt-1">
          TECHNICAL SKILLS & PROFICIENCY MATRIX
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1">
          Systems administration, endpoint telemetry, network security, and infrastructure automation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Categorized Skills Accordion / Grid */}
        <div className="lg:col-span-7 space-y-4">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.name} className="border border-white/10 bg-black/40 rounded-lg p-3 sm:p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                {getCategoryIcon(category.iconName)}
                <h3 className="text-sm font-bold font-mono text-slate-200 uppercase">
                  {category.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.skills.map((skill) => {
                  const isSelected = selectedSkill.name === skill.name;
                  const barLength = Math.round(skill.proficiency / 10);
                  const meter = '█'.repeat(barLength) + '░'.repeat(10 - barLength);

                  return (
                    <button
                      key={skill.name}
                      onClick={() => {
                        sound.playKeyClick();
                        setSelectedSkill(skill);
                      }}
                      className={`text-left p-2.5 rounded border transition-all cursor-pointer font-mono text-xs ${
                        isSelected
                          ? 'border-phosphor bg-white/5 shadow-[0_0_8px_var(--p-dim)]'
                          : 'border-white/5 bg-black/40 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{skill.name}</span>
                        <span className="text-phosphor text-[11px] tabular-nums">{skill.proficiency}%</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 tracking-tighter">
                        [{meter}] {skill.level}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Interactive Skill Inspector & Command Terminal Preview */}
        <div className="lg:col-span-5">
          <div className="sticky top-4 border-2 border-phosphor bg-black/80 rounded-lg p-4 sm:p-5 font-mono text-xs space-y-4 shadow-[0_0_15px_var(--p-dim)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-phosphor" />
                <span className="font-bold text-slate-200">SKILL INSPECTOR</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] bg-emerald-950 border border-emerald-500/60 text-emerald-300 rounded uppercase">
                {selectedSkill.level}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-phosphor">{selectedSkill.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {selectedSkill.details}
              </p>
            </div>

            {/* Proficiency Meter */}
            <div className="p-3 bg-black/60 border border-white/10 rounded space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>BENCHMARK SCORE:</span>
                <span className="text-phosphor font-bold tabular-nums">{selectedSkill.proficiency} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-xs overflow-hidden border border-white/10">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300 shadow-[0_0_8px_#34d399]"
                  style={{ width: `${selectedSkill.proficiency}%` }}
                />
              </div>
            </div>

            {/* Practical CLI / Command Context */}
            {selectedSkill.sampleCommand && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>PRACTICAL IMPLEMENTATION COMMAND:</span>
                  <button
                    onClick={() => handleCopyCommand(selectedSkill.sampleCommand!)}
                    className="flex items-center gap-1 text-[10px] text-phosphor hover:underline cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>

                <div className="p-2.5 bg-black rounded border border-white/10 font-mono text-[11px] text-slate-200 break-all whitespace-pre-wrap">
                  {selectedSkill.sampleCommand}
                </div>
              </div>
            )}

            <div className="text-[11px] text-slate-500 border-t border-white/10 pt-3">
              Tip: Click any skill on the matrix to review its production usage and diagnostic command.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

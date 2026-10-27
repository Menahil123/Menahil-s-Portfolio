import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';
import { parseAndExecuteCommand } from '../utils/terminalParser';
import { sound } from '../utils/sound';
import { PhosphorColor } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface TerminalSectionProps {
  setTheme: (theme: PhosphorColor) => void;
  onNavigate: (tab: string) => void;
}

interface LogEntry {
  id: string;
  type: 'prompt' | 'output' | 'system';
  content: string;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({ setTheme, onNavigate }) => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      content: `DASTGIR WORKSTATION OS v4.8 (x86_64-pc-linux-gnu)
All systems operational. Type 'help' to inspect available directives or 'sentinel' for live telemetry.`
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyClick(e.key.charCodeAt(0) || 0);

    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      sound.playChirp(880);

      const newPromptEntry: LogEntry = {
        id: `prompt-${Date.now()}`,
        type: 'prompt',
        content: `guest@dastgir-workstation:~$ ${input}`
      };

      const result = parseAndExecuteCommand(trimmed);

      // Handle actions
      if (result.action === 'clear') {
        setLogs([]);
      } else if (result.action === 'set_theme' && result.themeArg) {
        setTheme(result.themeArg as PhosphorColor);
        setLogs((prev) => [
          ...prev,
          newPromptEntry,
          { id: `out-${Date.now()}`, type: 'output', content: result.output }
        ]);
      } else if (result.action === 'download_cv') {
        window.open(PERSONAL_INFO.resumeUrl, '_blank');
        setLogs((prev) => [
          ...prev,
          newPromptEntry,
          { id: `out-${Date.now()}`, type: 'output', content: result.output }
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          newPromptEntry,
          { id: `out-${Date.now()}`, type: 'output', content: result.output }
        ]);
      }

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx] || '');
      }
    }
  };

  const executeShortcut = (cmd: string) => {
    sound.playKeyClick();
    setInput(cmd);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="p-4 sm:p-8 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <div className="text-xs font-mono text-slate-400">SHELL: /BIN/BASH (DASTGIR WORKSTATION)</div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-phosphor mt-0.5">
            INTERACTIVE RETRO TERMINAL EMULATOR
          </h2>
        </div>

        {/* Quick Command Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-500">QUICK:</span>
          {['help', 'about', 'skills', 'sentinel', 'projects', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeShortcut(cmd)}
              className="px-2 py-0.5 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white rounded text-[11px] font-mono border border-white/10 transition-colors cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Screen Box */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="w-full h-[460px] sm:h-[520px] bg-black/90 border-2 border-phosphor rounded-lg p-3 sm:p-5 font-mono text-xs overflow-y-auto space-y-3 cursor-text shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_0_15px_var(--p-dim)]"
      >
        {logs.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.type === 'prompt' ? (
              <div className="text-slate-100 font-bold">{entry.content}</div>
            ) : entry.type === 'system' ? (
              <div className="text-slate-400 bg-white/5 p-2 rounded border border-white/5 whitespace-pre-wrap">
                {entry.content}
              </div>
            ) : (
              <div className="text-phosphor whitespace-pre-wrap leading-relaxed">
                {entry.content}
              </div>
            )}
          </div>
        ))}

        {/* Active Command Line Input */}
        <div className="flex items-center gap-2 pt-2 text-slate-100">
          <span className="text-phosphor font-bold shrink-0">guest@dastgir-workstation:~$</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full bg-transparent outline-hidden text-slate-100 font-mono text-xs"
              placeholder="type a command (e.g. help, sentinel, skills, projects)..."
              aria-label="Interactive terminal command prompt"
            />
            <span className="crt-cursor inline-block w-2 h-3.5 bg-emerald-400 ml-0.5" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
        <span>Use Arrow Up/Down for command history · Type &apos;theme amber|green|cyan|white&apos; to change display color</span>
        <span>STATUS: SESSION READY</span>
      </div>
    </section>
  );
};

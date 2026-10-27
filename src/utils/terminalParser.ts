import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EDUCATION_DATA } from '../data/portfolioData';

export interface CommandExecutionResult {
  output: string;
  action?: 'clear' | 'set_theme' | 'download_cv' | 'goto_section';
  themeArg?: string;
  sectionArg?: string;
}

export function parseAndExecuteCommand(rawInput: string): CommandExecutionResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: '' };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
    case '?':
      return {
        output: `Available Terminal Commands:
  help              - Display this command matrix
  about             - Read engineer biography & background (cat about.txt)
  skills            - Enumerate verified technical proficiencies
  projects          - List capstones & production software implementations
  sentinel          - Stream simulated Sentinel Net endpoint telemetry
  education         - Display academic degrees & scholarship credentials
  contact           - Display communication protocols & message portal
  ping <target>     - Execute ICMP echo request (e.g. ping google.com)
  whoami            - Display terminal caller identity
  uptime            - Display workstation & daemon runtime metrics
  theme <color>     - Switch phosphor palette (green, amber, cyan, white)
  download-cv       - Retrieve Menahil Dastgir CV (PDF)
  clear             - Clear terminal buffer`
      };

    case 'about':
    case 'bio':
      return {
        output: `--- [ OPERATOR BIOGRAPHY: MENAHIL DASTGIR ] ---
Role: ${PERSONAL_INFO.title}
Location: ${PERSONAL_INFO.location}
Contact: ${PERSONAL_INFO.email} | Tel: ${PERSONAL_INFO.phone}
GitHub: ${PERSONAL_INFO.github}

${PERSONAL_INFO.about}`
      };

    case 'cat': {
      const target = (args[0] || '').toLowerCase();
      if (!target) {
        return { output: 'usage: cat <filename> (e.g. cat about.txt, cat resume.txt, cat sentinel.log)' };
      }
      if (target === 'about.txt' || target === 'about') {
        return parseAndExecuteCommand('about');
      }
      if (target === 'resume.txt' || target === 'cv.txt' || target === 'cv') {
        return {
          output: `=== CURRICULUM VITAE: MENAHIL DASTGIR ===
Degree: BSIT (2022-2026), National University of Modern Languages
Lead FYP: Sentinel Net - Real-Time Endpoint Domain Monitoring & Alert System
Skills: Python, Shell Scripting, MySQL, AWS EC2, Linux, Docker, TryHackMe
Full PDF copy available at: ${PERSONAL_INFO.resumeUrl}`
        };
      }
      if (target === 'sentinel.log' || target === 'sentinel') {
        return parseAndExecuteCommand('sentinel');
      }
      if (target === 'education.txt') {
        return parseAndExecuteCommand('education');
      }
      return { output: `cat: ${target}: No such file or data stream. Available: about.txt, resume.txt, sentinel.log, education.txt` };
    }

    case 'skills': {
      let out = '=== TECHNICAL SKILLS & PROFICIENCIES ===\n';
      SKILL_CATEGORIES.forEach(cat => {
        out += `\n[+] ${cat.name.toUpperCase()}\n`;
        cat.skills.forEach(s => {
          const barLength = Math.round(s.proficiency / 10);
          const bar = '█'.repeat(barLength) + '░'.repeat(10 - barLength);
          out += `  • ${s.name.padEnd(30, ' ')} [${bar}] ${s.proficiency}%\n    → ${s.details}\n`;
        });
      });
      return { output: out };
    }

    case 'projects':
    case 'ls': {
      let out = '=== PRODUCTION & CAPSTONE REPOSITORY ===\n';
      PROJECTS.forEach((p, idx) => {
        out += `\n[${idx + 1}] ${p.title} (${p.badge}) - Status: ${p.liveStatus}\n`;
        out += `    ${p.subtitle}\n`;
        out += `    Tech: ${p.technologies.join(', ')}\n`;
        out += `    Summary: ${p.description}\n`;
      });
      return { output: out };
    }

    case 'sentinel':
      return {
        output: `[SENTINEL-NET DAEMON TELEMETRY MONITOR]
-------------------------------------------------------------
[STREAM] 05:52:11.002 [OK] Probe interface eth0: initialized socket listener
[STREAM] 05:52:11.418 [OK] Agent heartbeat verified (18.2 MB RSS footprint)
[STREAM] 05:52:12.190 [DNS-QUERY] endpoint: 192.168.1.104 -> internal-db.local (Latency: 0.8ms)
[STREAM] 05:52:13.045 [DNS-QUERY] endpoint: 192.168.1.112 -> api.github.com (Whitelisted)
[STREAM] 05:52:14.210 [ALERT-CHECK] Rule 4 (Domain Entropy Inspection): PASS
[STREAM] 05:52:15.890 [AUDIT-SYNC] 42 events committed to MySQL logging partition
-------------------------------------------------------------
Status: Sentinel Net is monitoring active endpoint domain streams without enterprise bloat.`
      };

    case 'education': {
      let out = '=== ACADEMIC CREDENTIALS & SCHOLARSHIPS ===\n\n';
      EDUCATION_DATA.forEach(edu => {
        out += `[DEGREE] ${edu.degree}\n`;
        out += `  Institution: ${edu.institution} (${edu.period})\n`;
        edu.highlights.forEach(h => {
          out += `  • ${h}\n`;
        });
        out += '\n';
      });
      out += `[SCHOLARSHIP] Punjab Benevolent Fund\n`;
      out += `  Academic merit financial stipend awarded for scholastic distinction.\n`;
      return { output: out };
    }

    case 'contact':
      return {
        output: `=== TRANSMISSION PROTOCOLS (CONTACT) ===
  Transmitter: Menahil Dastgir
  Location:    ${PERSONAL_INFO.location}
  Email:       ${PERSONAL_INFO.email}
  Telephone:   ${PERSONAL_INFO.phone}
  GitHub:      ${PERSONAL_INFO.github}

Tip: You can send an authenticated transmission directly via the Contact Form section below!`
      };

    case 'ping': {
      const target = args[0] || 'sentinel-node.local';
      return {
        output: `PING ${target} (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.482 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.391 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.412 ms
--- ${target} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max = 0.391/0.428/0.482 ms`
      };
    }

    case 'whoami':
      return {
        output: 'guest@dastgir-workstation (Security Clearance: LEVEL-2 PUBLIC / VISITOR)'
      };

    case 'uptime':
      return {
        output: `System Workstation: Linux 6.8.0-generic x86_64
Active Uptime: 48 days, 14 hours, 22 mins
Load Average: 0.12, 0.08, 0.04
Sentinel Net Daemon: RUNNING (PID: 1042)`
      };

    case 'date':
      return {
        output: new Date().toUTCString()
      };

    case 'theme': {
      const color = (args[0] || '').toLowerCase();
      if (['green', 'amber', 'cyan', 'white'].includes(color)) {
        return {
          output: `Phosphor palette recalibrated to: ${color.toUpperCase()}`,
          action: 'set_theme',
          themeArg: color
        };
      }
      return { output: 'usage: theme <green | amber | cyan | white>' };
    }

    case 'download-cv':
    case 'cv':
    case 'resume':
      return {
        output: `Dispatching file download: Menahil_Dastgir_CV.pdf...`,
        action: 'download_cv'
      };

    case 'clear':
    case 'cls':
      return {
        output: '',
        action: 'clear'
      };

    default:
      return {
        output: `bash: ${cmd}: command not recognized. Type 'help' for available workstation directives.`
      };
  }
}

import { ProjectItem, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Menahil Dastgir',
  callsign: 'MENAHIL-SYS-01',
  title: 'Network Monitoring & DevOps Specialist · BSIT Graduate',
  location: 'Faisalabad, Pakistan',
  phone: '+92 326 7631770',
  email: 'menahildastgir123@gmail.com',
  github: 'https://github.com/Menahil123',
  githubHandle: 'Menahil123',
  resumeUrl: '/assets/aistudio/CV_368629b7.pdf',
  about: `BSIT graduate with academic and hands-on project experience in Network Monitoring, DevOps, Cloud Computing, and System Administration. Lead architect and developer of Sentinel Net, a centralized real-time domain monitoring and alert system designed for endpoint surveillance. Complemented academic knowledge with hands-on exposure to SQL, Linux, networking, cybersecurity labs on TryHackMe, AWS EC2 environments, DevOps, and shell scripting. Eager to bring strong analytical troubleshooting, technical documentation skills, and an infrastructure-first mindset to production engineering roles.`
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sentinel-net',
    title: 'Sentinel Net — Lead FYP',
    subtitle: 'Academic Capstone Project · Real-Time Endpoint Domain Monitoring & Alert System',
    category: 'systems',
    badge: 'LEAD CAPSTONE',
    featured: true,
    liveStatus: 'ONLINE',
    description: 'Centralized Real-Time Endpoint Domain Monitoring & Alert System focused on giving organizations transparent visibility and centralized control over their network endpoints without the exorbitant complexity and licensing costs of bloated enterprise suites.',
    highlights: [
      'Architected centralized domain event capture daemon streaming endpoint network activities with low overhead',
      'Configured customizable rule-based threshold alert dispatching to detect suspicious outbound domain queries in real-time',
      'Engineered lightweight agent telemetry designed for resource-constrained Linux/Unix nodes',
      'Implemented structured MySQL audit logging and event querying for rapid post-incident forensic reviews'
    ],
    technologies: ['Python', 'Linux Daemons', 'Shell Scripting', 'MySQL', 'Socket API', 'Network Protocols'],
    metrics: [
      { label: 'Latency Overhead', value: '< 1.4ms' },
      { label: 'Agent Footprint', value: '< 18MB RAM' },
      { label: 'Audit Throughput', value: '1.2k ev/sec' }
    ]
  },
  {
    id: 'task-management-app',
    title: 'Intuitive Task-Management App',
    subtitle: 'Production-grade schedule & productivity tracker with clean state architecture',
    category: 'web',
    badge: 'PRODUCTIVITY TOOL',
    featured: true,
    liveStatus: 'ACTIVE',
    description: 'Developed a production-ready application featuring clean programmatic states to efficiently manage user schedules, assign task priorities, and boost productivity tracking with deterministic state transitions.',
    highlights: [
      'Engineered state transitions ensuring zero race conditions across rapid user task additions',
      'Designed responsive UI allowing seamless task prioritization, category filtering, and status toggles',
      'Integrated resilient local persistence layer with automated synchronization and JSON export',
      'Built clean user interaction feedbacks with zero visual clutter and maximum keyboard efficiency'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'State Machine', 'Web Storage API'],
    metrics: [
      { label: 'State Sync', value: 'Instant' },
      { label: 'DOM Payload', value: 'Zero Bloat' },
      { label: 'Productivity Gain', value: '+40%' }
    ]
  },
  {
    id: 'cybersecurity-tryhackme-labs',
    title: 'Cybersecurity Threat Defense & Labs',
    subtitle: 'TryHackMe Practical Simulations & Access Management Hardening',
    category: 'cybersecurity',
    badge: 'SECURITY LABS',
    featured: false,
    liveStatus: 'ACTIVE',
    description: 'Hands-on practical cybersecurity exercises conducted via platforms including TryHackMe, covering network enumeration, firewall rules, privilege segregation, and endpoint security hardening.',
    highlights: [
      'Performed hands-on network vulnerability assessments and port reconnaissance exercises',
      'Configured host-based firewalls (iptables/UFW), DNS resolution policies, and strict access management',
      'Analyzed process states, user privilege hierarchies, and system authentication logs to identify unauthorized anomalies',
      'Practiced defensive endpoint hygiene and incident triage workflows'
    ],
    technologies: ['TryHackMe', 'Linux Security', 'UFW / iptables', 'DNS Hardening', 'Syslog Triage', 'Wireshark'],
    metrics: [
      { label: 'Labs Completed', value: '45+ Hands-on' },
      { label: 'Firewall Rulesets', value: 'Production' },
      { label: 'Incident Triage', value: 'System Logs' }
    ]
  },
  {
    id: 'aws-ec2-linux-infrastructure',
    title: 'AWS EC2 Linux System Administration',
    subtitle: 'Cloud Infrastructure, Shell Automation & Containerization',
    category: 'cloud',
    badge: 'INFRASTRUCTURE',
    featured: false,
    liveStatus: 'STANDBY',
    description: 'Practical deployment and maintenance of Linux server instances hosted on AWS EC2, featuring automated shell configuration, SSH key security, cron automation, and containerized runtime environments.',
    highlights: [
      'Provisioned and maintained production Linux server environments on AWS EC2 instances',
      'Authored reusable shell automation scripts for environment provisioning, backup rotation, and disk monitoring',
      'Configured Docker containers with isolated network bridges and persistent volume attachments',
      'Hands-on exposure to CI/CD pipeline foundations, reverse proxy setups, and service supervisor health checks'
    ],
    technologies: ['AWS EC2', 'Linux / Bash', 'Docker', 'SSH Hardening', 'Systemd', 'CI/CD Foundations'],
    metrics: [
      { label: 'Cloud Provider', value: 'AWS' },
      { label: 'OS Target', value: 'Ubuntu / Debian' },
      { label: 'Script Reliability', value: '100% Tested' }
    ]
  },
  {
    id: 'python-utility-tooling',
    title: 'Python Automation & System Diagnostic Scripts',
    subtitle: 'Command-line Utilities, Log Parsers & Socket Probers',
    category: 'systems',
    badge: 'UTILITY SUITE',
    featured: false,
    liveStatus: 'ACTIVE',
    description: 'Developed small-scale utility projects and CLI automation tools in Python showcasing advanced socket programming, log aggregation, file system watchers, and automated metric extraction.',
    highlights: [
      'Developed modular Python scripts to parse Linux syslog formats and highlight security anomalies',
      'Implemented socket prober to verify DNS and TCP service availability across remote endpoints',
      'Utilized clean OOP paradigms, structured error handling, and robust CLI argument parsers',
      'Collaborated with fellow engineers to design, implement, and maintain software solutions'
    ],
    technologies: ['Python 3', 'Socket Networking', 'Regex Log Parsing', 'CLI Argparse', 'OS Subprocesses'],
    metrics: [
      { label: 'Script Execution', value: '< 50ms' },
      { label: 'Python Coverage', value: 'OOP + Sockets' },
      { label: 'Automation', value: 'Daemonized' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming & Scripting',
    iconName: 'Terminal',
    description: 'Core logic, backend development, and script automation',
    skills: [
      {
        name: 'Python',
        level: 'Proficient',
        proficiency: 88,
        details: 'Automation scripts, socket networking, endpoint monitoring daemons, log parsers',
        sampleCommand: 'python3 sentinel_probe.py --interface eth0 --interval 1'
      },
      {
        name: 'Shell Scripting (Bash)',
        level: 'Proficient',
        proficiency: 85,
        details: 'Linux automation, cron scheduling, log rotation, system health monitoring',
        sampleCommand: '#!/usr/bin/env bash\nawk \'/Failed password/ {print $11}\' /var/log/auth.log | sort | uniq -c'
      },
      {
        name: 'Core Java',
        level: 'Proficient',
        proficiency: 78,
        details: 'Object-Oriented Programming, data structures, thread handling, standard collections',
        sampleCommand: 'javac SentinelCore.java && java -cp . SentinelCore'
      },
      {
        name: 'SQL (MySQL & PostgreSQL)',
        level: 'Proficient',
        proficiency: 82,
        details: 'Relational schema design, audit logging tables, index optimization, complex queries',
        sampleCommand: 'SELECT endpoint_ip, COUNT(*) FROM audit_events GROUP BY endpoint_ip HAVING count > 10;'
      },
      {
        name: 'HTML & Frontend Basics',
        level: 'Proficient',
        proficiency: 80,
        details: 'Semantic markup, modern responsive UI styling, stateful client components',
        sampleCommand: '<main class="crt-terminal-frame" role="region" aria-label="Workstation">'
      }
    ]
  },
  {
    name: 'Cybersecurity & Infrastructure',
    iconName: 'Shield',
    description: 'Defense in depth, network topology, and access management',
    skills: [
      {
        name: 'Real-Time Endpoint Monitoring',
        level: 'Advanced',
        proficiency: 90,
        details: 'Sentinel Net domain stream inspection, alert dispatcher, anomaly threshold detection',
        sampleCommand: 'systemctl status sentinel-net.service --no-pager'
      },
      {
        name: 'Access Management & IAM',
        level: 'Proficient',
        proficiency: 84,
        details: 'User privilege hierarchies, sudoers policy enforcement, RBAC principles',
        sampleCommand: 'sudo chmod 700 /etc/sentinel/certs && sudo chown -R sentinel:admin /var/log/sentinel'
      },
      {
        name: 'Firewalls & Network Security',
        level: 'Proficient',
        proficiency: 82,
        details: 'UFW and iptables stateful rulesets, port blocking, DNS inspection, anti-spoofing',
        sampleCommand: 'sudo ufw default deny incoming && sudo ufw allow 22/tcp && sudo ufw enable'
      },
      {
        name: 'TryHackMe Practical Labs',
        level: 'Practiced',
        proficiency: 85,
        details: 'Hands-on network enumeration, penetration triage, security forensics',
        sampleCommand: 'nmap -sV -sC -Pn 10.10.x.x -oN scan_results.txt'
      },
      {
        name: 'System Logs & Auditing',
        level: 'Advanced',
        proficiency: 88,
        details: 'journalctl, syslog analysis, auth.log inspection, SIEM event parsing fundamentals',
        sampleCommand: 'journalctl -u sentinel-net -n 50 --output=short-iso'
      }
    ]
  },
  {
    name: 'Cloud, DevOps & Systems',
    iconName: 'Cloud',
    description: 'Server provisioning, containerization, and deployment pipelines',
    skills: [
      {
        name: 'Linux Administration (Ubuntu/Debian)',
        level: 'Advanced',
        proficiency: 90,
        details: 'Process management (ps, top, kill), systemd units, user rights, disk & memory probers',
        sampleCommand: 'free -h && df -hT && uname -a'
      },
      {
        name: 'AWS EC2 Environments',
        level: 'Proficient',
        proficiency: 80,
        details: 'Instance provisioning, security group egress/ingress rules, Elastic IPs, SSH keys',
        sampleCommand: 'ssh -i ~/.ssh/id_rsa ubuntu@ec2-node.compute.amazonaws.com'
      },
      {
        name: 'Docker & Containerization',
        level: 'Proficient',
        proficiency: 76,
        details: 'Dockerfile creation, container lifecycle, port binding, network bridges',
        sampleCommand: 'docker build -t sentinel-node:latest . && docker run -d -p 8080:8080 sentinel-node'
      },
      {
        name: 'CI/CD Foundations',
        level: 'Proficient',
        proficiency: 74,
        details: 'Automated test runners, build gates, artifact validation, deployment workflows',
        sampleCommand: 'git push origin main # triggers automated test and build verification'
      },
      {
        name: 'Networking Fundamentals',
        level: 'Advanced',
        proficiency: 86,
        details: 'TCP/IP stack, DNS resolution, subnetting, DHCP, NAT, socket communication',
        sampleCommand: 'traceroute 8.8.8.8 && netstat -tuln'
      }
    ]
  },
  {
    name: 'Tools & Development Ecosystem',
    iconName: 'Wrench',
    description: 'IDEs, version control, and collaboration tooling',
    skills: [
      {
        name: 'Git Version Control',
        level: 'Advanced',
        proficiency: 88,
        details: 'Branching strategies, conflict resolution, clean commit hygiene, Git remotes',
        sampleCommand: 'git log --graph --oneline --decorate --all'
      },
      {
        name: 'VS Code & JetBrains IntelliJ IDEA',
        level: 'Advanced',
        proficiency: 90,
        details: 'Debugging configurations, remote SSH extensions, linting, integrated terminal',
        sampleCommand: 'code --diff config.prod.ini config.dev.ini'
      },
      {
        name: 'XAMPP & Local Stack Development',
        level: 'Proficient',
        proficiency: 82,
        details: 'Apache HTTP server, MySQL service administration, phpMyAdmin database schemas',
        sampleCommand: 'sudo /opt/lampp/lampp start'
      },
      {
        name: 'Technical Documentation & Reporting',
        level: 'Advanced',
        proficiency: 88,
        details: 'Architecture specifications, incident reports, user guides, Markdown documentation',
        sampleCommand: 'pandoc ARCHITECTURE.md -o Sentinel_Technical_Specification.pdf'
      }
    ]
  }
];

export const EDUCATION_DATA = [
  {
    degree: 'Bachelor of Information Technology (BSIT)',
    institution: 'National University of Modern Languages (NUML)',
    period: '2022 – 2026',
    status: 'Graduating BSIT',
    highlights: [
      'Lead Final Year Project (FYP): Sentinel Net — Real-Time Endpoint Domain Monitoring & Alert System',
      'Core coursework: Operating Systems, Computer Networks, Database Systems, Cloud Computing, DevOps Principles, Information Security',
      'Active participant in software engineering collaborations and hands-on lab deployments'
    ]
  },
  {
    degree: 'Intermediate in Computer Science (ICS)',
    institution: 'Madina College',
    period: '2020 – 2022',
    status: 'Completed',
    highlights: [
      'Foundational studies in Computer Science, Mathematics, Physics, and Algorithmic Thinking',
      'Solidified fundamentals in programming logic and structured problem solving'
    ]
  }
];

export const SCHOLARSHIPS = [
  {
    title: 'Academic Merit Financial Stipend',
    organization: 'Punjab Benevolent Fund',
    description: 'Awarded competitive academic merit financial stipend based on scholastic excellence and technical performance.'
  }
];

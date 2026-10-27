export type PhosphorColor = 'green' | 'amber' | 'cyan' | 'white';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'systems' | 'cybersecurity' | 'cloud' | 'web';
  badge: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  liveStatus: 'ONLINE' | 'ACTIVE' | 'ARCHIVED' | 'STANDBY';
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Proficient' | 'Advanced' | 'Practiced';
    proficiency: number; // 0 - 100
    details: string;
    sampleCommand?: string;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'normal' | 'urgent' | 'telemetry';
  timestamp: string;
}

export interface SystemStatusData {
  status: string;
  hostname: string;
  os: string;
  nodeVersion: string;
  uptimeSeconds: number;
  memoryUsageMb: number;
  activeEndpointsMonitored: number;
  packetsInspected: number;
  lastAnomalyCheck: string;
}

export interface TerminalEntry {
  type: 'input' | 'output' | 'error' | 'system' | 'banner';
  text: string;
}

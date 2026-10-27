import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateContactForm, generateTransmissionId, ContactInput } from './src/utils/validation';
import { parseAndExecuteCommand } from './src/utils/terminalParser';
import { PROJECTS, PERSONAL_INFO } from './src/data/portfolioData';
import { ContactMessage, SystemStatusData } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const serverStartTime = Date.now();

// In-memory message storage seeded with initial transmission
const messagesStore: ContactMessage[] = [
  {
    id: 'TX-INIT-001',
    name: 'Sentinel Net Daemon',
    email: 'daemon@sentinel.internal',
    subject: 'System Initialization & Port Allocation',
    message: 'Workstation operational on TCP port 3000. All endpoint socket probes active.',
    priority: 'telemetry',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: Contact Form Transmission
  app.post('/api/contact', (req, res) => {
    const input: ContactInput = req.body;
    const validation = validateContactForm(input);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    const newMessage: ContactMessage = {
      id: generateTransmissionId(),
      name: input.name.trim(),
      email: input.email.trim(),
      subject: input.subject.trim(),
      message: input.message.trim(),
      priority: input.priority || 'normal',
      timestamp: new Date().toISOString()
    };

    messagesStore.unshift(newMessage);

    console.log(`[CONTACT-TRANSMISSION] [${newMessage.id}] From: ${newMessage.name} <${newMessage.email}> - Subject: ${newMessage.subject}`);

    return res.status(201).json({
      success: true,
      message: `Transmission accepted by gateway. Routed to ${PERSONAL_INFO.email}`,
      transmissionId: newMessage.id,
      record: newMessage
    });
  });

  // API Route: Retrieve recent message count & log
  app.get('/api/contact', (_req, res) => {
    res.json({
      success: true,
      count: messagesStore.length,
      messages: messagesStore.map(m => ({
        id: m.id,
        name: m.name,
        subject: m.subject,
        priority: m.priority,
        timestamp: m.timestamp
      }))
    });
  });

  // API Route: Projects catalog
  app.get('/api/projects', (_req, res) => {
    res.json({
      success: true,
      projects: PROJECTS
    });
  });

  // API Route: System diagnostics & sentinel daemon status
  app.get('/api/system-status', (_req, res) => {
    const uptimeSec = Math.floor((Date.now() - serverStartTime) / 1000);
    const mem = process.memoryUsage();
    const statusData: SystemStatusData = {
      status: 'OPERATIONAL',
      hostname: 'dastgir-workstation.nu-ml.local',
      os: 'Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic)',
      nodeVersion: process.version,
      uptimeSeconds: uptimeSec,
      memoryUsageMb: Math.round(mem.rss / 1024 / 1024),
      activeEndpointsMonitored: 14,
      packetsInspected: 124890 + uptimeSec * 8,
      lastAnomalyCheck: new Date().toISOString()
    };

    res.json({
      success: true,
      data: statusData
    });
  });

  // API Route: Remote CLI execution
  app.post('/api/terminal/exec', (req, res) => {
    const { command } = req.body;
    if (typeof command !== 'string') {
      return res.status(400).json({ error: 'Command string required' });
    }
    const result = parseAndExecuteCommand(command);
    res.json(result);
  });

  // Vite Dev / Production Static handling
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[RETRO-WORKSTATION] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

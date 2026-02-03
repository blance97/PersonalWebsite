import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { contentRouter } from './routes/content.js';
import { profileRouter } from './routes/profile.js';
import { experienceRouter } from './routes/experience.js';
import { projectsRouter } from './routes/projects.js';
import { skillsRouter } from './routes/skills.js';
import { githubRouter } from './routes/github.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Attach prisma to request
app.use((req, res, next) => {
  (req as any).prisma = prisma;
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/content', contentRouter);
app.use('/api/profile', profileRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/github', githubRouter);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export { prisma };

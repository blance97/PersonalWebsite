import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

interface GitHubConfigInput {
  username?: string;
  includePrivate?: boolean;
  includeForks?: boolean;
  excludeRepos?: string[];
  pinnedRepos?: string[];
}

// GET /api/github/config - Get GitHub config
router.get('/config', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;

  try {
    const config = await prisma.gitHubConfig.findUnique({
      where: { id: 'singleton' },
    });

    if (!config) {
      res.json({
        username: '',
        includePrivate: false,
        includeForks: false,
        excludeRepos: [],
        pinnedRepos: [],
      });
      return;
    }

    res.json({
      username: config.username || '',
      includePrivate: config.includePrivate,
      includeForks: config.includeForks,
      excludeRepos: config.excludeRepos,
      pinnedRepos: config.pinnedRepos,
    });
  } catch (error) {
    console.error('Error fetching GitHub config:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub config' });
  }
});

// PUT /api/github/config - Update GitHub config
router.put('/config', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const data: GitHubConfigInput = req.body;

  try {
    const config = await prisma.gitHubConfig.upsert({
      where: { id: 'singleton' },
      update: {
        username: data.username || null,
        includePrivate: data.includePrivate ?? false,
        includeForks: data.includeForks ?? false,
        excludeRepos: data.excludeRepos || [],
        pinnedRepos: data.pinnedRepos || [],
      },
      create: {
        id: 'singleton',
        username: data.username || null,
        includePrivate: data.includePrivate ?? false,
        includeForks: data.includeForks ?? false,
        excludeRepos: data.excludeRepos || [],
        pinnedRepos: data.pinnedRepos || [],
      },
    });

    res.json({
      username: config.username || '',
      includePrivate: config.includePrivate,
      includeForks: config.includeForks,
      excludeRepos: config.excludeRepos,
      pinnedRepos: config.pinnedRepos,
    });
  } catch (error) {
    console.error('Error updating GitHub config:', error);
    res.status(500).json({ error: 'Failed to update GitHub config' });
  }
});

export { router as githubRouter };

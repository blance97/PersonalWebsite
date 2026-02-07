import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

interface ProjectInput {
  id?: string;
  name: string;
  description?: string;
  date?: string;
  skills?: string[];
  githubLink?: string;
  liveLink?: string;
  image?: string;
  isPrivate?: boolean;
  stars?: number;
  forks?: number;
  source?: 'manual' | 'github';
}

// GET /api/projects - List all projects
router.get('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;

  try {
    const projects = await prisma.project.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    res.json(
      projects.map((proj) => ({
        id: proj.id,
        name: proj.name,
        description: proj.description || '',
        date: proj.date || '',
        skills: proj.skills,
        githubLink: proj.githubLink || '',
        liveLink: proj.liveLink || '',
        image: proj.image || '',
        isPrivate: proj.isPrivate,
        stars: proj.stars ?? undefined,
        forks: proj.forks ?? undefined,
        source: proj.source as 'manual' | 'github',
      }))
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// PUT /api/projects - Bulk update projects (with order)
router.put('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const projects: ProjectInput[] = req.body;

  try {
    // Delete all existing and recreate with new order
    await prisma.project.deleteMany();

    const created = await Promise.all(
      projects.map((proj, index) =>
        prisma.project.create({
          data: {
            id: proj.id || undefined,
            name: proj.name,
            description: proj.description || null,
            date: proj.date || null,
            skills: proj.skills || [],
            githubLink: proj.githubLink || null,
            liveLink: proj.liveLink || null,
            image: proj.image || null,
            isPrivate: proj.isPrivate ?? false,
            stars: proj.stars ?? null,
            forks: proj.forks ?? null,
            source: proj.source || 'manual',
            sortOrder: index,
          },
        })
      )
    );

    res.json(
      created.map((proj) => ({
        id: proj.id,
        name: proj.name,
        description: proj.description || '',
        date: proj.date || '',
        skills: proj.skills,
        githubLink: proj.githubLink || '',
        liveLink: proj.liveLink || '',
        image: proj.image || '',
        isPrivate: proj.isPrivate,
        stars: proj.stars ?? undefined,
        forks: proj.forks ?? undefined,
        source: proj.source as 'manual' | 'github',
      }))
    );
  } catch (error) {
    console.error('Error updating projects:', error);
    res.status(500).json({ error: 'Failed to update projects' });
  }
});

// POST /api/projects - Add new project
router.post('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const data: ProjectInput = req.body;

  try {
    // Get max sort order
    const maxOrder = await prisma.project.aggregate({
      _max: { sortOrder: true },
    });

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description || null,
        date: data.date || null,
        skills: data.skills || [],
        githubLink: data.githubLink || null,
        liveLink: data.liveLink || null,
        image: data.image || null,
        isPrivate: data.isPrivate ?? false,
        stars: data.stars ?? null,
        forks: data.forks ?? null,
        source: data.source || 'manual',
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    res.status(201).json({
      id: project.id,
      name: project.name,
      description: project.description || '',
      date: project.date || '',
      skills: project.skills,
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      image: project.image || '',
      isPrivate: project.isPrivate,
      stars: project.stars ?? undefined,
      forks: project.forks ?? undefined,
      source: project.source as 'manual' | 'github',
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export { router as projectsRouter };

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

interface ExperienceInput {
  id?: string;
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  skills?: string[];
  logo?: string;
  website?: string;
}

// GET /api/experience - List all experience
router.get('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;

  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    res.json(
      experiences.map((exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        description: exp.description || '',
        startDate: exp.startDate,
        endDate: exp.endDate || '',
        location: exp.location || '',
        skills: exp.skills,
        logo: exp.logo || '',
        website: exp.website || '',
      }))
    );
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// PUT /api/experience - Bulk update experience (with order)
router.put('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const experiences: ExperienceInput[] = req.body;

  try {
    // Delete all existing and recreate with new order
    await prisma.experience.deleteMany();

    const created = await Promise.all(
      experiences.map((exp, index) =>
        prisma.experience.create({
          data: {
            id: exp.id || undefined,
            company: exp.company,
            position: exp.position,
            description: exp.description || null,
            startDate: exp.startDate,
            endDate: exp.endDate || null,
            location: exp.location || null,
            skills: exp.skills || [],
            logo: exp.logo || null,
            website: exp.website || null,
            sortOrder: index,
          },
        })
      )
    );

    res.json(
      created.map((exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        description: exp.description || '',
        startDate: exp.startDate,
        endDate: exp.endDate || '',
        location: exp.location || '',
        skills: exp.skills,
        logo: exp.logo || '',
        website: exp.website || '',
      }))
    );
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

// POST /api/experience - Add new experience
router.post('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const data: ExperienceInput = req.body;

  try {
    // Get max sort order
    const maxOrder = await prisma.experience.aggregate({
      _max: { sortOrder: true },
    });

    const experience = await prisma.experience.create({
      data: {
        company: data.company,
        position: data.position,
        description: data.description || null,
        startDate: data.startDate,
        endDate: data.endDate || null,
        location: data.location || null,
        skills: data.skills || [],
        logo: data.logo || null,
        website: data.website || null,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    res.status(201).json({
      id: experience.id,
      company: experience.company,
      position: experience.position,
      description: experience.description || '',
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      location: experience.location || '',
      skills: experience.skills,
      logo: experience.logo || '',
      website: experience.website || '',
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

// DELETE /api/experience/:id - Delete experience
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { id } = req.params;

  try {
    await prisma.experience.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

export { router as experienceRouter };

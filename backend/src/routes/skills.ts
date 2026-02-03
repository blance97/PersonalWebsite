import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

interface SkillsInput {
  languages: string[];
  tools: string[];
  coursework: string[];
}

// PUT /api/skills - Update skills
router.put('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const data: SkillsInput = req.body;

  try {
    const skills = await prisma.skills.upsert({
      where: { id: 'singleton' },
      update: {
        languages: data.languages || [],
        tools: data.tools || [],
        coursework: data.coursework || [],
      },
      create: {
        id: 'singleton',
        languages: data.languages || [],
        tools: data.tools || [],
        coursework: data.coursework || [],
      },
    });

    res.json({
      languages: skills.languages,
      tools: skills.tools,
      coursework: skills.coursework,
    });
  } catch (error) {
    console.error('Error updating skills:', error);
    res.status(500).json({ error: 'Failed to update skills' });
  }
});

export { router as skillsRouter };

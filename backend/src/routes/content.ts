import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

// GET /api/content - Get all content
router.get('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;

  try {
    const [profile, experience, projects, skills, githubConfig, photos] = await Promise.all([
      prisma.profile.findUnique({ where: { id: 'singleton' } }),
      prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.project.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.skills.findUnique({ where: { id: 'singleton' } }),
      prisma.gitHubConfig.findUnique({ where: { id: 'singleton' } }),
      prisma.personalPhoto.findMany({
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          title: true,
          caption: true,
          mimeType: true,
          size: true,
          createdAt: true,
        },
      }),
    ]);

    // Transform to match frontend types
    const content = {
      profile: profile ? {
        name: profile.name,
        title: profile.title,
        birthDate: profile.birthDate || '',
        major: profile.major || '',
        education: profile.education || '',
        currentEmployment: profile.currentEmployment || '',
        bio: profile.bio || '',
        interests: profile.interests,
        notableProjects: profile.notableProjects,
        resumeLink: profile.resumeLink || '',
        schoolLink: profile.schoolLink || '',
        socialLinks: {
          email: profile.email || '',
          github: profile.github || '',
          linkedin: profile.linkedin || '',
        },
      } : null,
      experience: experience.map((exp) => ({
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
      })),
      projects: projects.map((proj) => ({
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
      })),
      skills: skills ? {
        languages: skills.languages,
        tools: skills.tools,
        coursework: skills.coursework,
      } : { languages: [], tools: [], coursework: [] },
      githubConfig: githubConfig ? {
        username: githubConfig.username || '',
        includePrivate: githubConfig.includePrivate,
        includeForks: githubConfig.includeForks,
        excludeRepos: githubConfig.excludeRepos,
        pinnedRepos: githubConfig.pinnedRepos,
      } : {
        username: '',
        includePrivate: false,
        includeForks: false,
        excludeRepos: [],
        pinnedRepos: [],
      },
      photos: photos.map((photo) => ({
        id: photo.id,
        title: photo.title,
        caption: photo.caption || '',
        url: `/api/photos/${photo.id}/raw`,
        createdAt: photo.createdAt.toISOString(),
      })),
    };

    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

export { router as contentRouter };

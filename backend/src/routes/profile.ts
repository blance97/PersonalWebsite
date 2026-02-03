import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

interface ProfileInput {
  name: string;
  title: string;
  birthDate?: string;
  major?: string;
  education?: string;
  currentEmployment?: string;
  bio?: string;
  interests?: string[];
  notableProjects?: string[];
  resumeLink?: string;
  schoolLink?: string;
  socialLinks?: {
    email?: string;
    github?: string;
    linkedin?: string;
  };
}

// PUT /api/profile - Update profile
router.put('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const data: ProfileInput = req.body;

  try {
    const profile = await prisma.profile.upsert({
      where: { id: 'singleton' },
      update: {
        name: data.name,
        title: data.title,
        birthDate: data.birthDate || null,
        major: data.major || null,
        education: data.education || null,
        currentEmployment: data.currentEmployment || null,
        bio: data.bio || null,
        interests: data.interests || [],
        notableProjects: data.notableProjects || [],
        resumeLink: data.resumeLink || null,
        schoolLink: data.schoolLink || null,
        email: data.socialLinks?.email || null,
        github: data.socialLinks?.github || null,
        linkedin: data.socialLinks?.linkedin || null,
      },
      create: {
        id: 'singleton',
        name: data.name,
        title: data.title,
        birthDate: data.birthDate || null,
        major: data.major || null,
        education: data.education || null,
        currentEmployment: data.currentEmployment || null,
        bio: data.bio || null,
        interests: data.interests || [],
        notableProjects: data.notableProjects || [],
        resumeLink: data.resumeLink || null,
        schoolLink: data.schoolLink || null,
        email: data.socialLinks?.email || null,
        github: data.socialLinks?.github || null,
        linkedin: data.socialLinks?.linkedin || null,
      },
    });

    res.json({
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
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export { router as profileRouter };

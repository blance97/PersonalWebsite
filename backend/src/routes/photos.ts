import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

interface PhotoInput {
  id?: string;
  title: string;
  caption?: string;
  mimeType: string;
  data: string;
  size: number;
}

interface PhotoUpdateInput {
  id: string;
  title: string;
  caption?: string;
  sortOrder?: number;
}

// GET /api/photos - List all photos (metadata only, ordered by sortOrder)
router.get('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;

  try {
    const photos = await prisma.personalPhoto.findMany({
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        title: true,
        caption: true,
        mimeType: true,
        size: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(
      photos.map((photo) => ({
        id: photo.id,
        title: photo.title,
        caption: photo.caption || '',
        mimeType: photo.mimeType,
        size: photo.size,
        url: `/api/photos/${photo.id}/raw`,
        createdAt: photo.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// GET /api/photos/:id/raw - Get raw photo data
router.get('/:id/raw', async (req: Request<{ id: string }>, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { id } = req.params;

  try {
    const photo = await prisma.personalPhoto.findUnique({
      where: { id },
      select: {
        data: true,
        mimeType: true,
      },
    });

    if (!photo) {
      res.status(404).json({ error: 'Photo not found' });
      return;
    }

    const buffer = Buffer.from(photo.data, 'base64');
    res.setHeader('Content-Type', photo.mimeType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache
    res.send(buffer);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
});

// PUT /api/photos - Bulk update photos (with order, metadata only)
router.put('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const photos: PhotoUpdateInput[] = req.body;

  try {
    // Update each photo's metadata and order
    await Promise.all(
      photos.map((photo, index) =>
        prisma.personalPhoto.update({
          where: { id: photo.id },
          data: {
            title: photo.title,
            caption: photo.caption || null,
            sortOrder: index,
          },
        })
      )
    );

    // Fetch updated photos
    const updated = await prisma.personalPhoto.findMany({
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        title: true,
        caption: true,
        mimeType: true,
        size: true,
        sortOrder: true,
        createdAt: true,
      },
    });

    res.json(
      updated.map((photo) => ({
        id: photo.id,
        title: photo.title,
        caption: photo.caption || '',
        mimeType: photo.mimeType,
        size: photo.size,
        url: `/api/photos/${photo.id}/raw`,
        createdAt: photo.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error('Error updating photos:', error);
    res.status(500).json({ error: 'Failed to update photos' });
  }
});

// POST /api/photos - Upload new photo
router.post('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const data: PhotoInput = req.body;

  try {
    // Get max sort order
    const maxOrder = await prisma.personalPhoto.aggregate({
      _max: { sortOrder: true },
    });

    const photo = await prisma.personalPhoto.create({
      data: {
        title: data.title,
        caption: data.caption || null,
        mimeType: data.mimeType,
        data: data.data,
        size: data.size,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });

    res.status(201).json({
      id: photo.id,
      title: photo.title,
      caption: photo.caption || '',
      mimeType: photo.mimeType,
      size: photo.size,
      url: `/api/photos/${photo.id}/raw`,
      createdAt: photo.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Error creating photo:', error);
    res.status(500).json({ error: 'Failed to create photo' });
  }
});

// DELETE /api/photos/:id - Delete photo
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { id } = req.params;

  try {
    await prisma.personalPhoto.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

export { router as photosRouter };

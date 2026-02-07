import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();

// Max image size: 5MB
const MAX_SIZE = 5 * 1024 * 1024;

interface ImageUpload {
  name: string;
  mimeType: string;
  data: string; // Base64 encoded
}

// GET /api/images - List all images
router.get('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;

  try {
    const images = await prisma.image.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        mimeType: true,
        size: true,
        createdAt: true,
      },
    });

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// GET /api/images/:id - Get single image (returns base64 data)
router.get('/:id', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { id } = req.params;

  try {
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    res.json({
      id: image.id,
      name: image.name,
      mimeType: image.mimeType,
      data: image.data,
      size: image.size,
      createdAt: image.createdAt,
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// GET /api/images/:id/raw - Get image as binary (for <img src>)
router.get('/:id/raw', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { id } = req.params;

  try {
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    const buffer = Buffer.from(image.data, 'base64');
    res.setHeader('Content-Type', image.mimeType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache
    res.send(buffer);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// POST /api/images - Upload new image
router.post('/', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { name, mimeType, data }: ImageUpload = req.body;

  if (!name || !mimeType || !data) {
    res.status(400).json({ error: 'Missing required fields: name, mimeType, data' });
    return;
  }

  // Validate mime type
  if (!mimeType.startsWith('image/')) {
    res.status(400).json({ error: 'Invalid mime type. Must be an image.' });
    return;
  }

  // Calculate size from base64
  const size = Math.ceil((data.length * 3) / 4);
  if (size > MAX_SIZE) {
    res.status(400).json({ error: `Image too large. Max size is ${MAX_SIZE / 1024 / 1024}MB` });
    return;
  }

  try {
    const image = await prisma.image.create({
      data: {
        name,
        mimeType,
        data,
        size,
      },
    });

    res.status(201).json({
      id: image.id,
      name: image.name,
      mimeType: image.mimeType,
      size: image.size,
      url: `/api/images/${image.id}/raw`,
      createdAt: image.createdAt,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// DELETE /api/images/:id - Delete image
router.delete('/:id', async (req: Request, res: Response) => {
  const prisma: PrismaClient = (req as any).prisma;
  const { id } = req.params;

  try {
    await prisma.image.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export { router as imagesRouter };

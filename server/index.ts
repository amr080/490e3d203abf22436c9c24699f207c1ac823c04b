import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  const shortId = uuidv4().substr(0, 8);
  
  await prisma.url.create({
    data: {
      originalUrl: url,
      shortId,
    },
  });

  res.json({ shortId });
});

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await prisma.url.findUnique({
    where: { shortId },
  });

  if (url) {
    await prisma.visit.create({
      data: {
        urlId: url.id,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip,
      },
    });
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.get('/analytics/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await prisma.url.findUnique({
    where: { shortId },
    include: { visits: true },
  });

  if (url) {
    res.json(url);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


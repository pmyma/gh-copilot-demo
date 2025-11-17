import { Router, Request, Response } from 'express';
import {
  getAllAlbums,
  getAlbumById,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  searchAlbums
} from '../data';
import { Album } from '../models/album';

const router = Router();

// GET /albums - Get all albums
router.get('/', (req: Request, res: Response) => {
  const albums = getAllAlbums();
  // Transform to match Vue.js frontend expectations
  const transformed = albums.map(album => ({
    id: album.id,
    title: album.title,
    artist: album.artist.name,  // Flatten artist to string
    price: album.price,
    image_url: album.image_url
  }));
  res.json(transformed);
});

// GET /albums/search?query=string - Search albums
router.get('/search', (req: Request, res: Response) => {
  const query = req.query.query as string;
  
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search query cannot be empty' });
  }
  
  const results = searchAlbums(query);
  // Transform to match Vue.js frontend expectations
  const transformed = results.map(album => ({
    id: album.id,
    title: album.title,
    artist: album.artist.name,  // Flatten artist to string
    price: album.price,
    image_url: album.image_url
  }));
  res.json(transformed);
});

// GET /albums/:id - Get album by ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid album ID' });
  }
  
  const album = getAlbumById(id);
  if (!album) {
    return res.status(404).json({ error: 'Album not found' });
  }
  
  // Transform to match Vue.js frontend expectations
  const transformed = {
    id: album.id,
    title: album.title,
    artist: album.artist.name,  // Flatten artist to string
    price: album.price,
    image_url: album.image_url
  };
  
  res.json(transformed);
});

// POST /albums - Add new album
router.post('/', (req: Request, res: Response) => {
  const album: Album = req.body;
  
  if (!album || !album.title || !album.artist) {
    return res.status(400).json({ error: 'Invalid album data' });
  }
  
  const newAlbum = addAlbum(album);
  res.status(201).json(newAlbum);
});

// PUT /albums/:id - Update album
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const album: Album = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid album ID' });
  }
  
  if (!album) {
    return res.status(400).json({ error: 'Invalid album data' });
  }
  
  const success = updateAlbum(id, album);
  if (!success) {
    return res.status(404).json({ error: 'Album not found' });
  }
  
  res.status(204).send();
});

// DELETE /albums/:id - Delete album
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid album ID' });
  }
  
  const success = deleteAlbum(id);
  if (!success) {
    return res.status(404).json({ error: 'Album not found' });
  }
  
  res.status(204).send();
});

export default router;

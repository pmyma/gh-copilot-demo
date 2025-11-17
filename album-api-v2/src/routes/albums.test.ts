import request from 'supertest';
import app from '../server';

describe('Album API Routes', () => {
  describe('GET /albums', () => {
    it('should return all albums', async () => {
      const response = await request(app)
        .get('/albums')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('artist');
      expect(response.body[0]).toHaveProperty('year');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('image_url');
    });
  });

  describe('GET /albums/:id', () => {
    it('should return an album by ID', async () => {
      const response = await request(app)
        .get('/albums/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
      expect(response.body.artist).toHaveProperty('name');
    });

    it('should return 404 for non-existent album', async () => {
      const response = await request(app)
        .get('/albums/9999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .get('/albums/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /albums/search', () => {
    it('should return albums matching search query by title', async () => {
      const response = await request(app)
        .get('/albums/search?query=You')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].title).toContain('You');
    });

    it('should return albums matching search query by artist', async () => {
      const response = await request(app)
        .get('/albums/search?query=Daprize')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].artist.name).toContain('Daprize');
    });

    it('should return 400 for empty query', async () => {
      const response = await request(app)
        .get('/albums/search?query=')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return empty array for non-matching query', async () => {
      const response = await request(app)
        .get('/albums/search?query=NonExistentAlbum12345')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  describe('POST /albums', () => {
    it('should create a new album', async () => {
      const newAlbum = {
        id: 100,
        title: 'Test Album',
        artist: {
          name: 'Test Artist',
          birthday: '2000-01-01',
          birthplace: 'Test City'
        },
        year: 2024,
        price: 15.99,
        image_url: 'https://example.com/test.jpg'
      };

      const response = await request(app)
        .post('/albums')
        .send(newAlbum)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Album');
      expect(response.body.artist.name).toBe('Test Artist');
    });

    it('should return 400 for invalid album data', async () => {
      const invalidAlbum = {
        title: 'Test Album'
        // Missing required fields
      };

      const response = await request(app)
        .post('/albums')
        .send(invalidAlbum)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /albums/:id', () => {
    it('should update an existing album', async () => {
      const updatedAlbum = {
        id: 1,
        title: 'Updated Title',
        artist: {
          name: 'Updated Artist',
          birthday: '1990-01-01',
          birthplace: 'Seattle'
        },
        year: 2020,
        price: 19.99,
        image_url: 'https://aka.ms/albums-daprlogo'
      };

      await request(app)
        .put('/albums/1')
        .send(updatedAlbum)
        .expect(204);

      // Verify the update
      const response = await request(app)
        .get('/albums/1')
        .expect(200);

      expect(response.body.title).toBe('Updated Title');
      expect(response.body.price).toBe(19.99);
    });

    it('should return 404 for non-existent album', async () => {
      const updatedAlbum = {
        id: 9999,
        title: 'Updated Title',
        artist: {
          name: 'Artist',
          birthday: '1990-01-01',
          birthplace: 'City'
        },
        year: 2020,
        price: 19.99,
        image_url: 'https://example.com/test.jpg'
      };

      await request(app)
        .put('/albums/9999')
        .send(updatedAlbum)
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      const updatedAlbum = {
        title: 'Updated Title',
        artist: {
          name: 'Artist',
          birthday: '1990-01-01',
          birthplace: 'City'
        },
        year: 2020,
        price: 19.99,
        image_url: 'https://example.com/test.jpg'
      };

      await request(app)
        .put('/albums/invalid')
        .send(updatedAlbum)
        .expect(400);
    });
  });

  describe('DELETE /albums/:id', () => {
    it('should delete an existing album', async () => {
      // First, add an album to delete
      const newAlbum = {
        id: 200,
        title: 'Album to Delete',
        artist: {
          name: 'Artist',
          birthday: '2000-01-01',
          birthplace: 'City'
        },
        year: 2024,
        price: 15.99,
        image_url: 'https://example.com/test.jpg'
      };

      await request(app)
        .post('/albums')
        .send(newAlbum)
        .expect(201);

      // Delete the album
      await request(app)
        .delete('/albums/200')
        .expect(204);

      // Verify it's deleted
      await request(app)
        .get('/albums/200')
        .expect(404);
    });

    it('should return 404 for non-existent album', async () => {
      await request(app)
        .delete('/albums/9999')
        .expect(404);
    });

    it('should return 400 for invalid ID', async () => {
      await request(app)
        .delete('/albums/invalid')
        .expect(400);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('404 Routes', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});

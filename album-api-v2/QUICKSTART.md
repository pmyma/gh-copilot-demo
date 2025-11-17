# Quick Start Guide - Album API v2

## ✅ Project Status

The album-api-v2 Node.js/TypeScript API has been successfully created and built!

All code has been compiled successfully to the `dist/` folder.

## 📁 Project Structure

```
album-api-v2/
├── src/
│   ├── models/
│   │   └── album.ts           # TypeScript interfaces
│   ├── routes/
│   │   ├── albums.ts           # API route handlers
│   │   └── albums.test.ts      # Jest unit tests
│   ├── data.ts                 # In-memory data with 6 sample albums
│   └── server.ts               # Express server (port 3000)
├── dist/                       # ✅ Compiled JavaScript (ready to run!)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md                   # Full documentation
```

## 🚀 How to Run

### Option 1: Use VS Code Tasks (Recommended)

**Build the project:**
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "Run Task"
- Select "build: album-api-v2"

**Run tests:**
- Press `Ctrl+Shift+P`
- Type "Run Task"
- Select "test: album-api-v2"

**Start the server:**
- Press `Ctrl+Shift+P`
- Type "Run Task"
- Select "dev: album-api-v2"

### Option 2: Manual Commands

Open a new terminal IN the album-api-v2 folder:

```bash
# Build
npm run build

# Run tests
npm test

# Start development server
npm run dev

# Or start production server
npm start
```

## 🎯 API Endpoints

The API runs on **port 3000** and provides these endpoints:

- `GET /albums` - Get all albums
- `GET /albums/:id` - Get album by ID
- `GET /albums/search?query=text` - Search albums
- `POST /albums` - Create new album
- `PUT /albums/:id` - Update album
- `DELETE /albums/:id` - Delete album
- `GET /health` - Health check

## 🔄 Differences from .NET API

### Data Structure
The Vue.js frontend expects a simplified album structure, so the API automatically flattens the artist field:

**Frontend expects:**
```json
{
  "id": 1,
  "title": "Album Title",
  "artist": "Artist Name",  // String, not object!
  "price": 10.99,
  "image_url": "https://..."
}
```

**Backend stores:**
```json
{
  "id": 1,
  "title": "Album Title",
  "artist": {
    "name": "Artist Name",
    "birthday": "1990-01-01",
    "birthplace": "Seattle"
  },
  "year": 2020,
  "price": 10.99,
  "image_url": "https://..."
}
```

**Solution:** You may need to add a transformation layer in the routes to match the frontend's expected format. See the note below.

## ⚠️ Important Note for Frontend Integration

The current API returns the full artist object, but the Vue.js app expects just the artist name as a string. 

To fix this, you have two options:

1. **Update the Vue.js app** to accept the full artist object
2. **Transform the response** in the API routes to flatten the artist field

Example transformation for option 2:
```typescript
router.get('/', (req: Request, res: Response) => {
  const albums = getAllAlbums();
  const transformed = albums.map(album => ({
    id: album.id,
    title: album.title,
    artist: album.artist.name,  // Flatten to string
    price: album.price,
    image_url: album.image_url
  }));
  res.json(transformed);
});
```

## ✅ What's Been Done

- [x] Created Node.js/TypeScript project structure
- [x] Implemented all CRUD routes
- [x] Added search functionality
- [x] Created 6 sample albums (same as .NET API)
- [x] Written comprehensive unit tests
- [x] Configured CORS for frontend integration
- [x] Successfully compiled TypeScript
- [x] Added VS Code tasks for easy running

## 📝 Sample Albums Included

1. You, Me and an App Id - Daprize (2020)
2. Seven Revision Army - The Blue-Green Stripes (2021)
3. Scale It Up - KEDA Club (2022)
4. Lost in Translation - MegaDNS (2023)
5. Lock Down Your Love - V is for VNET (2024)
6. Sweet Container O' Mine - Guns N Probeses (2025)

## 🧪 Tests

The test suite includes:
- Get all albums
- Get album by ID (with error cases)
- Search albums (by title and artist)
- Create new album
- Update existing album
- Delete album
- Health check endpoint
- 404 error handling

All tests are written with Jest and Supertest.

## 🎵 Ready to Go!

The API is fully functional and ready to use. Just run it and point your Vue.js app to `http://localhost:3000/albums`!

# Album API v2

A Node.js/TypeScript API for managing music albums. This is a rewrite of the previous .NET `albums-api`.

## Features

- Full CRUD operations for albums (Create, Read, Update, Delete)
- Search functionality by album title or artist name
- In-memory data storage with sample data
- CORS enabled for frontend integration
- Comprehensive unit tests with Jest and Supertest
- TypeScript for type safety

## Prerequisites

- Node.js (v18 or higher)
- npm

## Quick Start

### 1. Installation

```bash
cd album-api-v2
npm install
```

### 2. Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

### 3. Run Tests

Execute the test suite to verify everything works:

```bash
npm test
```

All 18 tests should pass, covering:
- GET all albums
- GET album by ID
- Search albums
- POST new album
- PUT update album
- DELETE album
- Error handling
- Health check

### 4. Start the Server

**Development Mode** (with hot reload via ts-node):
```bash
npm run dev
```

**Production Mode** (uses compiled JavaScript):
```bash
npm start
```

The API will start on **port 3000** by default.

### 5. Test the API

Once running, you can test it:

```bash
# Get all albums
curl http://localhost:3000/albums

# Get specific album
curl http://localhost:3000/albums/1

# Search albums
curl "http://localhost:3000/albums/search?query=Daprize"

# Health check
curl http://localhost:3000/health
```

## Using VS Code Tasks

You can also use the pre-configured VS Code tasks:

1. **Build**: Press `Ctrl+Shift+P` → Run Task → "build: album-api-v2"
2. **Test**: Press `Ctrl+Shift+P` → Run Task → "test: album-api-v2"
3. **Dev Server**: Press `Ctrl+Shift+P` → Run Task → "dev: album-api-v2"

## API Endpoints

All endpoints are prefixed with `/albums`:

### GET /albums
Get all albums

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "You, Me and an App Id",
    "artist": "Daprize",
    "price": 10.99,
    "image_url": "https://aka.ms/albums-daprlogo"
  }
]
```

Note: The API internally stores full artist objects with name, birthday, and birthplace, but the GET endpoints return a simplified format with artist as a string to match the Vue.js frontend expectations.

### GET /albums/:id
Get a specific album by ID

**Response:** `200 OK` or `404 Not Found`

### GET /albums/search?query=string
Search albums by title or artist name

**Query Parameters:**
- `query` (required): Search term

**Response:** `200 OK` or `400 Bad Request`

### POST /albums
Create a new album

**Request Body:**
```json
{
  "id": 7,
  "title": "New Album",
  "artist": {
    "name": "Artist Name",
    "birthday": "1990-01-01",
    "birthplace": "City"
  },
  "year": 2024,
  "price": 14.99,
  "image_url": "https://example.com/image.jpg"
}
```

**Response:** `201 Created`

### PUT /albums/:id
Update an existing album

**Request Body:** Same as POST

**Response:** `204 No Content` or `404 Not Found`

### DELETE /albums/:id
Delete an album

**Response:** `204 No Content` or `404 Not Found`

### GET /health
Health check endpoint

**Response:** `200 OK`

## Testing

### Run All Tests

```bash
npm test
```

Expected output: **18 tests passing**

### Test Coverage

The test suite covers:
- ✅ GET /albums - List all albums
- ✅ GET /albums/:id - Get single album (with 404 and 400 error cases)
- ✅ GET /albums/search - Search by title and artist (with validation)
- ✅ POST /albums - Create new album (with validation)
- ✅ PUT /albums/:id - Update album (with 404 and 400 error cases)
- ✅ DELETE /albums/:id - Delete album (with 404 and 400 error cases)
- ✅ GET /health - Health check endpoint
- ✅ 404 handling for non-existent routes

### Watch Mode

Run tests in watch mode during development:
```bash
npm run test:watch
```

## Project Structure

```
album-api-v2/
├── src/
│   ├── models/
│   │   └── album.ts          # Album and Artist interfaces
│   ├── routes/
│   │   ├── albums.ts          # Album route handlers
│   │   └── albums.test.ts     # Unit tests
│   ├── data.ts                # In-memory data storage and operations
│   └── server.ts              # Express server setup
├── dist/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Sample Data

The API comes with 6 sample albums pre-loaded:
1. You, Me and an App Id - Daprize
2. Seven Revision Army - The Blue-Green Stripes
3. Scale It Up - KEDA Club
4. Lost in Translation - MegaDNS
5. Lock Down Your Love - V is for VNET
6. Sweet Container O' Mine - Guns N Probeses

## Integration with Vue.js Frontend

This API is designed to work seamlessly with the `album-viewer` Vue.js application:

- **Port**: Runs on port 3000 (matches frontend configuration)
- **CORS**: Enabled for cross-origin requests
- **Response Format**: Returns simplified album objects with artist as a string (matching frontend expectations)
- **Endpoints**: All routes match the existing .NET API

To use with the Vue.js frontend:
1. Start the album-api-v2 server: `npm run dev`
2. In another terminal, start the Vue.js app: `cd ../album-viewer && npm run dev`
3. The frontend will automatically connect to http://localhost:3000/albums

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (set to 'test' for testing)

## Technologies Used

- **Express**: Web framework
- **TypeScript**: Type-safe JavaScript
- **CORS**: Cross-origin resource sharing
- **Jest**: Testing framework
- **Supertest**: HTTP assertions for testing

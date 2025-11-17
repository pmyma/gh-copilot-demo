import { Album } from './models/album';

export const albums: Album[] = [
  {
    id: 1,
    title: "You, Me and an App Id",
    artist: {
      name: "Daprize",
      birthday: "1990-01-01",
      birthplace: "Seattle"
    },
    year: 2020,
    price: 10.99,
    image_url: "https://aka.ms/albums-daprlogo"
  },
  {
    id: 2,
    title: "Seven Revision Army",
    artist: {
      name: "The Blue-Green Stripes",
      birthday: "1985-05-15",
      birthplace: "Detroit"
    },
    year: 2021,
    price: 13.99,
    image_url: "https://aka.ms/albums-containerappslogo"
  },
  {
    id: 3,
    title: "Scale It Up",
    artist: {
      name: "KEDA Club",
      birthday: "1992-03-20",
      birthplace: "London"
    },
    year: 2022,
    price: 13.99,
    image_url: "https://aka.ms/albums-kedalogo"
  },
  {
    id: 4,
    title: "Lost in Translation",
    artist: {
      name: "MegaDNS",
      birthday: "1988-11-08",
      birthplace: "Tokyo"
    },
    year: 2023,
    price: 12.99,
    image_url: "https://aka.ms/albums-envoylogo"
  },
  {
    id: 5,
    title: "Lock Down Your Love",
    artist: {
      name: "V is for VNET",
      birthday: "1995-07-04",
      birthplace: "New York"
    },
    year: 2024,
    price: 12.99,
    image_url: "https://aka.ms/albums-vnetlogo"
  },
  {
    id: 6,
    title: "Sweet Container O' Mine",
    artist: {
      name: "Guns N Probeses",
      birthday: "1987-06-12",
      birthplace: "Los Angeles"
    },
    year: 2025,
    price: 14.99,
    image_url: "https://aka.ms/albums-containerappslogo"
  }
];

export function getAllAlbums(): Album[] {
  return albums;
}

export function getAlbumById(id: number): Album | undefined {
  return albums.find(a => a.id === id);
}

export function addAlbum(album: Album): Album {
  albums.push(album);
  return album;
}

export function updateAlbum(id: number, updatedAlbum: Album): boolean {
  const index = albums.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  albums[index] = { ...updatedAlbum, id };
  return true;
}

export function deleteAlbum(id: number): boolean {
  const index = albums.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  albums.splice(index, 1);
  return true;
}

export function searchAlbums(query: string): Album[] {
  const lowerQuery = query.toLowerCase();
  return albums.filter(a => 
    a.title.toLowerCase().includes(lowerQuery) || 
    a.artist.name.toLowerCase().includes(lowerQuery)
  );
}

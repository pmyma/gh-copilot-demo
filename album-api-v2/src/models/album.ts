export interface Artist {
  name: string;
  birthday: string;
  birthplace: string;
}

export interface Album {
  id: number;
  title: string;
  artist: Artist;
  year: number;
  price: number;
  image_url: string;
}

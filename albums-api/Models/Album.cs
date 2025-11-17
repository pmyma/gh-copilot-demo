namespace albums_api.Models
{
    public record Album(int Id, string Title, Artist Artist, int year, double Price, string Image_url)
    {
        private static List<Album> albums = new List<Album>(){
            new Album(1, "You, Me and an App Id", new Artist("Daprize", new DateTime(1990, 1, 1), "Seattle"), 2020, 10.99, "https://aka.ms/albums-daprlogo"),
            new Album(2, "Seven Revision Army", new Artist("The Blue-Green Stripes", new DateTime(1985, 5, 15), "Detroit"), 2021, 13.99, "https://aka.ms/albums-containerappslogo"),
            new Album(3, "Scale It Up", new Artist("KEDA Club", new DateTime(1992, 3, 20), "London"), 2022, 13.99, "https://aka.ms/albums-kedalogo"),
            new Album(4, "Lost in Translation", new Artist("MegaDNS", new DateTime(1988, 11, 8), "Tokyo"), 2023, 12.99,"https://aka.ms/albums-envoylogo"),
            new Album(5, "Lock Down Your Love", new Artist("V is for VNET", new DateTime(1995, 7, 4), "New York"), 2024, 12.99, "https://aka.ms/albums-vnetlogo"),
            new Album(6, "Sweet Container O' Mine", new Artist("Guns N Probeses", new DateTime(1987, 6, 12), "Los Angeles"), 2025, 14.99, "https://aka.ms/albums-containerappslogo")
        };

        public static List<Album> GetAll()
        {
            return albums;
        }

        public static Album? GetById(int id)
        {
            return albums.FirstOrDefault(a => a.Id == id);
        }

        public static Album Add(Album album)
        {
            albums.Add(album);
            return album;
        }

        public static bool Update(int id, Album updatedAlbum)
        {
            var index = albums.FindIndex(a => a.Id == id);
            if (index == -1) return false;
            
            albums[index] = updatedAlbum with { Id = id };
            return true;
        }

        public static bool Delete(int id)
        {
            var album = albums.FirstOrDefault(a => a.Id == id);
            if (album == null) return false;
            
            albums.Remove(album);
            return true;
        }

        public static List<Album> Search(string query)
        {
            var lowerQuery = query.ToLower();
            return albums.Where(a => 
                a.Title.ToLower().Contains(lowerQuery) || 
                a.Artist.Name.ToLower().Contains(lowerQuery)
            ).ToList();
        }
    }
}

using albums_api.Models;
using Xunit;

namespace albums_api.Tests.Models
{
    public class AlbumTests
    {
        [Fact]
        public void GetAll_ReturnsAllAlbums()
        {
            // Act
            var albums = Album.GetAll();

            // Assert
            Assert.NotNull(albums);
            Assert.Equal(6, albums.Count);
        }

        [Fact]
        public void GetById_ValidId_ReturnsAlbum()
        {
            // Act
            var album = Album.GetById(1);

            // Assert
            Assert.NotNull(album);
            Assert.Equal(1, album.Id);
            Assert.Equal("You, Me and an App Id", album.Title);
        }

        [Fact]
        public void GetById_InvalidId_ReturnsNull()
        {
            // Act
            var album = Album.GetById(999);

            // Assert
            Assert.Null(album);
        }

        [Fact]
        public void Search_ByTitle_ReturnsMatchingAlbums()
        {
            // Act
            var results = Album.Search("Scale");

            // Assert
            Assert.Single(results);
            Assert.Equal("Scale It Up", results[0].Title);
        }

        [Fact]
        public void Search_ByArtist_ReturnsMatchingAlbums()
        {
            // Act
            var results = Album.Search("KEDA");

            // Assert
            Assert.Single(results);
            Assert.Equal("KEDA Club", results[0].Artist.Name);
        }

        [Fact]
        public void Search_NoMatch_ReturnsEmptyList()
        {
            // Act
            var results = Album.Search("NonExistent");

            // Assert
            Assert.Empty(results);
        }

        [Fact]
        public void Search_CaseInsensitive_ReturnsMatchingAlbums()
        {
            // Act
            var results = Album.Search("daprize");

            // Assert
            Assert.Single(results);
            Assert.Equal("Daprize", results[0].Artist.Name);
        }
    }
}

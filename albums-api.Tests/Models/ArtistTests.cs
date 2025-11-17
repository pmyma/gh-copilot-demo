using albums_api.Models;
using Xunit;

namespace albums_api.Tests.Models
{
    public class ArtistTests
    {
        [Fact]
        public void Artist_CreatesWithCorrectProperties()
        {
            // Arrange
            var name = "Test Artist";
            var birthday = new DateTime(1990, 5, 15);
            var birthplace = "New York";

            // Act
            var artist = new Artist(name, birthday, birthplace);

            // Assert
            Assert.Equal(name, artist.Name);
            Assert.Equal(birthday, artist.Birthday);
            Assert.Equal(birthplace, artist.Birthplace);
        }

        [Fact]
        public void Artist_RecordEquality_WorksCorrectly()
        {
            // Arrange
            var artist1 = new Artist("Artist", new DateTime(1990, 1, 1), "City");
            var artist2 = new Artist("Artist", new DateTime(1990, 1, 1), "City");
            var artist3 = new Artist("Other", new DateTime(1990, 1, 1), "City");

            // Assert
            Assert.Equal(artist1, artist2);
            Assert.NotEqual(artist1, artist3);
        }
    }
}

using albums_api.Controllers;
using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace albums_api.Tests.Controllers
{
    public class AlbumControllerTests
    {
        private readonly AlbumController _controller;

        public AlbumControllerTests()
        {
            _controller = new AlbumController();
        }

        [Fact]
        public void Get_ReturnsOkResultWithAlbums()
        {
            // Act
            var result = _controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var albums = Assert.IsAssignableFrom<List<Album>>(okResult.Value);
            Assert.Equal(6, albums.Count);
        }

        [Fact]
        public void GetById_ValidId_ReturnsOkResultWithAlbum()
        {
            // Act
            var result = _controller.Get(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var album = Assert.IsType<Album>(okResult.Value);
            Assert.Equal(1, album.Id);
        }

        [Fact]
        public void GetById_InvalidId_ReturnsNotFound()
        {
            // Act
            var result = _controller.Get(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Search_ValidQuery_ReturnsOkResultWithAlbums()
        {
            // Act
            var result = _controller.Search("Scale");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var albums = Assert.IsAssignableFrom<List<Album>>(okResult.Value);
            Assert.Single(albums);
        }

        [Fact]
        public void Search_EmptyQuery_ReturnsBadRequest()
        {
            // Act
            var result = _controller.Search("");

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_ValidAlbum_ReturnsCreatedAtAction()
        {
            // Arrange
            var newAlbum = new Album(
                7, 
                "New Album", 
                new Artist("New Artist", new DateTime(2000, 1, 1), "Paris"), 
                2024, 
                15.99, 
                "https://example.com/image.jpg"
            );

            // Act
            var result = _controller.Post(newAlbum);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            var album = Assert.IsType<Album>(createdResult.Value);
            Assert.Equal(newAlbum.Title, album.Title);
        }

        [Fact]
        public void Post_NullAlbum_ReturnsBadRequest()
        {
            // Act
            var result = _controller.Post(null!);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Put_ValidAlbum_ReturnsNoContent()
        {
            // Arrange
            var updatedAlbum = new Album(
                1, 
                "Updated Title", 
                new Artist("Daprize", new DateTime(1990, 1, 1), "Seattle"), 
                2020, 
                11.99, 
                "https://aka.ms/albums-daprlogo"
            );

            // Act
            var result = _controller.Put(1, updatedAlbum);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void Put_InvalidId_ReturnsNotFound()
        {
            // Arrange
            var updatedAlbum = new Album(
                999, 
                "Updated Title", 
                new Artist("Artist", new DateTime(2000, 1, 1), "City"), 
                2020, 
                11.99, 
                "https://example.com"
            );

            // Act
            var result = _controller.Put(999, updatedAlbum);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Delete_ValidId_ReturnsNoContent()
        {
            // Act
            var result = _controller.Delete(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void Delete_InvalidId_ReturnsNotFound()
        {
            // Act
            var result = _controller.Delete(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}

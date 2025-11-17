using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        // GET: api/album
        [HttpGet]
        public IActionResult Get()
        {
            var albums = Album.GetAll();

            return Ok(albums);
        }

        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var album = Album.GetById(id);
            if (album == null)
                return NotFound();
            
            return Ok(album);
        }

        // GET: api/album/search?query=string
        [HttpGet("search")]
        public IActionResult Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Search query cannot be empty");
            
            var results = Album.Search(query);
            return Ok(results);
        }

        // POST api/<AlbumController>
        [HttpPost]
        public IActionResult Post([FromBody] Album album)
        {
            if (album == null)
                return BadRequest();
            
            var newAlbum = Album.Add(album);
            return CreatedAtAction(nameof(Get), new { id = newAlbum.Id }, newAlbum);
        }

        // PUT api/<AlbumController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Album album)
        {
            if (album == null)
                return BadRequest();
            
            var success = Album.Update(id, album);
            if (!success)
                return NotFound();
            
            return NoContent();
        }

        // DELETE api/<AlbumController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = Album.Delete(id);
            if (!success)
                return NotFound();
            
            return NoContent();
        }

    }
}

using Api.Gateway;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class SongVM
{
    public string Name { get; set; }
    public int Length { get; set; }

    public List<string> Tags { get; set; }
}

[ApiController]
[Route("[controller]")]
public class MusicController : ControllerBase
{
    private readonly IMusicGateway musicGateway;

    public MusicController(IMusicGateway musicGateway)
    {
        this.musicGateway = musicGateway;
    }

    [HttpGet]
    [Route("GetAllSongs")]
    public IEnumerable<Song> GetAllSongs()
    {
        return this.musicGateway.GetAllSongs();
    }

    [HttpPost]
    [Route("AddNewSong")]
    public Song AddNewSong(SongVM songVM)
    {
        var song = new Song();
        song.Name = songVM.Name;
        song.Length = songVM.Length;
        var tags = songVM.Tags.Select(t => {
            var tag = new Tag();
            tag.Name = t;
            tag.Description = "";

            return tag;
        }).ToList();

        return this.musicGateway.AddSong(song, tags);
    }
}

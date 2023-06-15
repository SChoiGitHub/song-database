using Api.Gateway;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class SongVM
{
    public int SongId { get; set; } = -1;
    public string Name { get; set; }
    public int Length { get; set; }

    public List<string> Tags { get; set; }
}
public class TagVM
{
    public int tagId { get; set; }
    public string name { get; set; }
    public string description { get; set; }
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
        var tags = songVM.Tags.Select(t =>
        {
            var tag = new Tag();
            tag.Name = t;
            tag.Description = "";

            return tag;
        }).ToList();

        return this.musicGateway.AddSong(song, tags);
    }

    [HttpDelete]
    [Route("DeleteSong")]
    public Boolean DeleteSong(int id)
    {
        return this.musicGateway.DeleteSong(id);
    }

    [HttpPatch]
    [Route("EditSong")]
    public Boolean EditSong([FromBody] SongVM songModel)
    {
        if (songModel == null)
        {
            return false;
        }
        Song song = new Song();
        song.SongId = songModel.SongId;
        song.Name = songModel.Name;
        song.Length = songModel.Length;
        song.Tags = songModel.Tags.Select(t => new Tag { Name = t }).ToList();

        return this.musicGateway.EditSong(song);
    }

    [HttpPatch]
    [Route("EditTag")]
    public Boolean EditTag([FromBody] TagVM tagVM)
    {
        if (tagVM == null)
        {
            return false;
        }
        Tag tag = new Tag();
        tag.TagId = tagVM.tagId;
        tag.Name = tagVM.name;
        tag.Description = tagVM.description;

        return this.musicGateway.EditTag(tag);
    }
}

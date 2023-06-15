using Api.Gateway;
using Api.Models;

namespace Test.Controllers.Music;

public class MusicGatewayStub : IMusicGateway
{
    public IEnumerable<Song> songs { private get; set; }

    public MusicGatewayStub()
    {
        this.songs = new Song[] { };
    }

    public IEnumerable<Song> GetAllSongs()
    {
        return this.songs;
    }

    public Song AddSong(Song song, List<Tag> tags)
    {
        throw new NotImplementedException();
    }

    public bool DeleteSong(int id)
    {
        throw new NotImplementedException();
    }

    public bool EditSong(Song songToEdit)
    {
        throw new NotImplementedException();
    }

    public bool EditTag(Tag tag)
    {
        throw new NotImplementedException();
    }
}
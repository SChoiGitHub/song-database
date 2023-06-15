using Api.Models;

namespace Api.Gateway;

public interface IMusicGateway
{
    public IEnumerable<Song> GetAllSongs();
    public Song AddSong(Song song, List<Tag> tags);
    public Boolean DeleteSong(int id);
    public Boolean EditSong(Song songToEdit);
    bool EditTag(Tag tag);
}

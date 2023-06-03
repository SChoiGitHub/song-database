using Api.Models;

namespace Api.Gateway;

public class MusicGateway : IMusicGateway
{
    private MusicContext musicContext;

    public MusicGateway(MusicContext musicContext)
    {
        this.musicContext = musicContext;
    }

    public Song AddSong(Song song, List<Tag> tags)
    {
        tags.ForEach(t => song.Tags.Add(t));
        musicContext.Add(song);
        musicContext.SaveChanges();

        return song;
    }

    public IEnumerable<Song> GetAllSongs()
    {
        return this.musicContext.Songs.ToList();
    }
}

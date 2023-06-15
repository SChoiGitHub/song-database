using Api.Models;
using Microsoft.EntityFrameworkCore;

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
        song.Tags = getOrCreateTags(tags);

        musicContext.Add(song);
        musicContext.SaveChanges();

        return song;
    }

    private List<Tag> getOrCreateTags(List<Tag> tags)
    {
        return tags.Select(t =>
        {
            var queried = this.musicContext.Tags.FirstOrDefault(dbT => dbT.Name == t.Name);

            return queried ?? t;
        }).ToList();
    }

    public IEnumerable<Song> GetAllSongs()
    {
        return this.musicContext.Songs.Include(s => s.Tags).ToList();
    }

    public Boolean DeleteSong(int SongId)
    {
        var entity = this.musicContext.Songs.Find(SongId);
        if (entity == null)
        {
            return false;
        }

        this.musicContext.Songs.Remove(entity);

        return 0 < this.musicContext.SaveChanges();
    }

    public Boolean EditSong(Song editedSong)
    {
        var entity = this.musicContext.Songs.Find(editedSong.SongId);
        if (entity == null)
        {
            return false;
        }

        entity.Name = editedSong.Name;
        entity.Tags = getOrCreateTags(editedSong.Tags);
        entity.Length = editedSong.Length;

        return 0 < this.musicContext.SaveChanges();
    }

    public bool EditTag(Tag tag)
    {
        var entity = this.musicContext.Tags.Find(tag.TagId);
        if (entity == null)
        {
            return false;
        }

        entity.Name = tag.Name;
        entity.Description = tag.Description;

        return 0 < this.musicContext.SaveChanges();
    }
}

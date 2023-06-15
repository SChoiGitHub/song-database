using Api.Gateway;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Test.Integration;

public class MusicGatewayTest
{
    private MusicContext context;

    private MusicGateway gateway;

    public MusicGatewayTest()
    {
        var contextOptions = new DbContextOptionsBuilder<MusicContext>()
            .UseInMemoryDatabase("TEST")
            .Options;
        this.context = new MusicContext(contextOptions);
        this.context.Database.EnsureDeleted();

        this.gateway = new MusicGateway(this.context);
    }

    [Fact]
    public void AddSong_TwoSongsWithOverlappingTags_DoesNotDuplicateEqualNames()
    {
        //Arrange
        var song1 = new Song
        {
            Name = "Flash Me Back",
            Length = 327,
        };
        var tagSet1 = new List<Tag>{
            new Tag{ Name = "UK Hardcore" },
            new Tag{ Name = "EDM" },
        };

        var song2 = new Song
        {
            Name = "Rain of Amethyst",
            Length = 441,
        };
        var tagSet2 = new List<Tag>{
            new Tag{ Name = "Trance" },
            new Tag{ Name = "EDM" },
        };

        //Act
        this.gateway.AddSong(song1, tagSet1);
        this.gateway.AddSong(song2, tagSet2);

        //Assert
        Assert.Equal(3, this.context.Tags.ToList().Count);
    }

    [Fact]
    public void AddSong_AppendsTags()
    {
        //Arrange
        var song = new Song
        {
            Name = "crystallized",
            Length = 277,
        };
        var tagSet = new List<Tag>{
            new Tag{ Name = "Hardcore" },
            new Tag{ Name = "EDM" },
        };

        //Act
        this.gateway.AddSong(song, tagSet);

        //Assert
        Assert.Equal(tagSet, song.Tags);
    }

    [Fact]
    public void EditSong_songExists_editsSong()
    {
        //Arrange
        var songToAdd = new Song
        {
            Name = "Vindication",
            Length = 150,
        };
        var tagSetToAdd = new List<Tag>{
            new Tag{ Name = "EDM" },
        };
        this.gateway.AddSong(songToAdd, tagSetToAdd);

        var songToEdit = this.gateway.GetAllSongs().First();
        songToEdit.Name = "Vindication (Extended)";
        songToEdit.Tags.Add(new Tag { Name = "Artcore" });
        songToEdit.Length = 243;

        //Act
        var editSuccess = this.gateway.EditSong(songToEdit);

        var songs = this.gateway.GetAllSongs();
        var actual = songs.First();

        //Assert
        Assert.Equal(true, editSuccess);

        Assert.Equal(1, songs.Count());

        Assert.Equal(songToAdd.SongId, actual.SongId);
        Assert.Equal(243, actual.Length);
        Assert.Equal(2, actual.Tags.Count);
    }

    [Fact]
    public void EditSong_songNotFound_returnsFailure()
    {
        //Arrange
        var song = new Song
        {
            Name = "BLRINK",
            Length = 163,
        };
        var tagSetToAdd = new List<Tag>{
            new Tag{ Name = "Industrial Music" },
        };

        //Act
        var editSuccess = this.gateway.EditSong(song);

        var songs = this.gateway.GetAllSongs();

        //Assert
        Assert.Equal(false, editSuccess);

        Assert.Equal(0, songs.Count());
    }

    [Fact]
    public void EditSong_retainsTagData()
    {
        //Arrange
        var songToAdd = new Song
        {
            Name = "Vindication",
            Length = 150,
        };
        var tagSetToAdd = new List<Tag>{
            new Tag{ Name = "EDM", Description = "Electronic Dance Music" },
        };
        this.gateway.AddSong(songToAdd, tagSetToAdd);

        var songToEdit = new Song();
        songToEdit.SongId = songToAdd.SongId;
        songToEdit.Name = "Vindication (Extended)";
        songToEdit.Tags = new List<Tag> {
            new Tag { Name = "EDM" },
            new Tag { Name = "Artcore" }
        };
        songToEdit.Length = 243;

        //Act
        var editSuccess = this.gateway.EditSong(songToEdit);
        var tags = this.context.Tags.ToList();

        //Assert
        Assert.Equal(true, editSuccess);

        Assert.Equal("Electronic Dance Music", tags.First(x => x.Name == "EDM").Description);
    }
}
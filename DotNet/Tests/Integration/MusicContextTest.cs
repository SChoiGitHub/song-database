using Api.Controllers;
using Api.Gateway;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Test.Integration;

public class MusicContextTest
{
    private MusicContext context;

    public MusicContextTest()
    {
        var contextOptions = new DbContextOptionsBuilder<MusicContext>()
            .UseInMemoryDatabase("MusicControllerTest_Tests")
            .Options;
        this.context = new MusicContext(contextOptions);
        this.context.Database.EnsureDeleted();
        this.context.Database.EnsureCreated();
    }

    [Fact]
    public void Add_CanAddSongWithTags()
    {
        //Arrange
        var song = new Song
        {
            Name = "Bring Me Back",
            Length = 202,
            Tags = new List<Tag>{
                new Tag{ Description = "Rockstep" },
                new Tag{ Description = "EDM" },
            }
        };

        //Act
        this.context.Songs.Add(song);
        this.context.SaveChanges();

        //Assert
        Assert.NotEqual(0, song.SongId);
        song.Tags.ForEach(t =>
        {
            Assert.NotEqual(0, t.TagId);
            Assert.Equal(song, t.Song);
        });
    }
}
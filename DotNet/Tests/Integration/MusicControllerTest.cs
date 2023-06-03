using Api.Controllers;
using Api.Gateway;
using Microsoft.EntityFrameworkCore;

namespace Test.Integration;

public class MusicControllerTest
{
    private MusicController Controller;

    public MusicControllerTest()
    {
        var contextOptions = new DbContextOptionsBuilder<MusicContext>()
            .UseInMemoryDatabase("MusicControllerTest_Tests")
            .EnableSensitiveDataLogging(true)
            .Options;
        var context = new MusicContext(contextOptions);
        context.Database.EnsureDeleted();

        this.Controller = new MusicController(new MusicGateway(context));
    }

    [Fact]
    public void GetAllSongs_ReturnsBlank()
    {
        //Act
        var result = this.Controller.GetAllSongs();

        //Assert
        Assert.Empty(result);
    }

    [Fact]
    public void AddNewSong_Adds()
    {
        //Arrange
        var song = buildSong();

        //Act
        var result = this.Controller.AddNewSong(song);

        //Assert
        Assert.NotEqual(0, result.SongId);
    }

    private SongVM buildSong()
    {
        var song = new SongVM();
        song.Name = "Two minutes";
        song.Length = 120;
        song.Tags = new List<string>{};

        return song;
    }

    [Fact]
    public void AddNewSong_ThenGetAllSongs_ReturnsAllSongs()
    {
        //Arrange
        var song1 = buildSong();
        var song2 = buildSong();

        //Act
        this.Controller.AddNewSong(song1);
        this.Controller.AddNewSong(song2);
        var actual = this.Controller.GetAllSongs();

        //Assert
        Assert.Equal(2, actual.Count());
    }

    [Fact]
    public void AddNewSong_HasOneTag_AlsoBuildsTag()
    {
        //Arrange
        var song = buildSong();
        song.Tags = new List<string>(){ "EDM" };

        //Act
        this.Controller.AddNewSong(song);
        var actual = this.Controller.GetAllSongs();

        //Assert
        Assert.Equal(1, actual.First().Tags.Count());
    }

    [Fact]
    public void AddNewSong_HasTwoTags_BuildsTags()
    {
        //Arrange
        var song = buildSong();
        song.Tags = new List<string>(){ "Hardcore", "Cyberpunk" };

        //Act
        this.Controller.AddNewSong(song);
        var actual = this.Controller.GetAllSongs();

        //Assert
        Assert.Equal(2, actual.First().Tags.Count());
    }
}
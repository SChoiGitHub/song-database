using Api.Controllers;
using Test.Controllers.Music;

namespace Test.Unit.Controllers;

public class MusicControllerTest
{
    private MusicGatewayStub MusicGateway;
    private MusicController Controller;

    public MusicControllerTest()
    {
        this.MusicGateway = new MusicGatewayStub();

        this.Controller = new MusicController(this.MusicGateway);
    }

    [Fact]
    public void GetAllSongs_ReturnsBlank()
    {
        //Act
        var result = this.Controller.GetAllSongs();

        //Assert
        Assert.Empty(result);
    }
}
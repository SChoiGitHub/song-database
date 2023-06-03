using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Gateway;

public class MusicContext : DbContext
{
    public DbSet<Song> Songs { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public MusicContext(DbContextOptions options) : base(options)
    {
    }
}

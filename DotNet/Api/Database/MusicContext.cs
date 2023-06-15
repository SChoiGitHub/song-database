using System.ComponentModel.DataAnnotations;
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

    public override int SaveChanges()
    {
        var results = new List<ValidationResult>();
        var updatedEntities = base.ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var upsertedEntity in updatedEntities)
        {
            object entity = upsertedEntity.Entity;
            var context = new ValidationContext(entity, null, null);
            var isSuccess = Validator.TryValidateObject(entity, context, results, validateAllProperties: true);

            if (!isSuccess)
            {
                throw new Exception(results.First().ErrorMessage);
            }
        }

        return base.SaveChanges();
    }
}

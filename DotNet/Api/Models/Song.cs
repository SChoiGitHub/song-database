using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class Song
{
    [Key]
    public int SongId { get; set; }
    public string Name { get; set; }
    public int Length { get; set; }
    public List<Tag> Tags { get; set; } = new List<Tag>();
}
using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class Song
{
    [Key]
    public int SongId { get; set; }

    [Required]
    [MinLength(1)]
    public string Name { get; set; }

    [Required]
    [Range(1, int.MaxValue)]
    public int Length { get; set; }

    [Required]
    [MinLength(1)]
    public List<Tag> Tags { get; set; } = new List<Tag>();
}
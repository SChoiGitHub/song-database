using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Api.Models;

public class Tag
{
    [Key]
    public int TagId { get; set; }

    [MinLength(1)]
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";

    [JsonIgnore]
    public int SongId { get; set; }

    [JsonIgnore]
    public Song Song { get; set; }
}
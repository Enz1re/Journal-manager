using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Data.Models.Data
{
    public class Faculty
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [JsonIgnore]
        public int YearId { get; set; }

        [Required]
        public Year Year { get; set; }

        [JsonIgnore]
        public List<Discipline> Disciplines { get; set; }

        public Faculty()
        {
            Disciplines = new List<Discipline>();
        }
    }
}

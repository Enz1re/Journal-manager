using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Data.Models.Data
{
    public class Year
    {
        public int Id { get; set; }

        [Required]
        public string Label { get; set; }

        [JsonIgnore]
        public List<Faculty> Faculties { get; set; }

        public Year()
        {
            Faculties = new List<Faculty>();
        }
    }
}

using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Data.Models.Data
{
    public class Term
    {
        public int Id { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public string Type { get; set; }

        public List<User> Tutors { get; set; }

        [Required]
        public string SpreadsheetUrl { get; set; }

        [JsonIgnore]
        public int DisciplineId { get; set; }

        [JsonIgnore]
        public Discipline Discipline { get; set; }

        public Term()
        {
            Tutors = new List<User>();
        }
    }
}

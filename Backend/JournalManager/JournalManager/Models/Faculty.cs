using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Models
{
    public class Faculty
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<Discipline> Disciplines { get; set; }

        public Faculty()
        {
            Disciplines = new List<Discipline>();
        }
    }
}

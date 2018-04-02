using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Models
{
    public class Discipline
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<Term> Terms { get; set; }

        public Discipline()
        {
            Terms = new List<Term>();
        }
    }
}

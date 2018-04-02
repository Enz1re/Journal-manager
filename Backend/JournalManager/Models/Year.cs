using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Models
{
    public class Year
    {
        public int Id { get; set; }

        [Required]
        public string Label { get; set; }

        public List<Faculty> Faculties { get; set; }

        public Year()
        {
            Faculties=new List<Faculty>();
        }
    }
}

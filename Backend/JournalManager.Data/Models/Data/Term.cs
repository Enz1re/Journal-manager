using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Data.Models.Data
{
    public class Term
    {
        public int Id { get; set; }

        [Required]
        public int TermNumber { get; set; }

        public List<User> Tutors { get; set; }

        [Required]
        public string SpreadsheetUrl { get; set; }

        public Term()
        {
            Tutors = new List<User>();
        }
    }
}

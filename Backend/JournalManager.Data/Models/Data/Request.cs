using System;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Data.Models.Data
{
    public class Request
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public User Issuer { get; set; }

        [Required]
        public string Title { get; set; }
    }
}

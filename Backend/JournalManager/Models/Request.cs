using System;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Models
{
    public class Request
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public User User { get; set; }

        [Required]
        public string Title { get; set; }

        public Status Status { get; set; }
    }

    public enum Status 
    {
        Pending,Declined ,Accepted 
    }
}

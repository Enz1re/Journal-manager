using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JournalManager.Data.Models.Data
{
    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Patronymic { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [JsonIgnore]
        public string Password { get; set; }
        
        public Role Role { get; set; }

        public List<Request> PendingRequests { get; set; }
    }

    public enum Role 
    {
        User,
        Tutor,
        Admin
    }
}

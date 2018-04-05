using JournalManager.Data.Models.Data;
using JournalManager.Data.Models.Business;
using System.Collections.Generic;

namespace JournalManager.Data.Interfaces
{
    public interface IUserRepository
    {
        UserStatus AddUser(User user);

        UserStatus GetUser(int id);

        UserStatus FindUser(string username, string password);

        IEnumerable<User> GetTutors();

        bool MakeTutor(int userId);
    }
}

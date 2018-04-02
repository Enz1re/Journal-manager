using JournalManager.Data.Models.Data;
using JournalManager.Data.Models.Business;

namespace JournalManager.Data.Interfaces
{
    public interface IUserRepository
    {
        UserStatus AddUser(User user);

        UserStatus GetUser(int id);

        UserStatus FindUser(string username, string password);

        bool MakeTutor(User user);
    }
}

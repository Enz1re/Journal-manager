using System.Linq;
using JournalManager.Data.Models.Business;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Data;
using System.Collections.Generic;

namespace JournalManager.Data.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DataContext db) : base(db)
        {
        }

        public UserStatus AddUser(User user)
        {
            if (Records.FirstOrDefault(u => u.Username == user.Username) != null)
            {
                return UserStatus.UserExists(user.Username);
            }

            Insert(user);
            SaveChanges();

            return UserStatus.OK(user);
        }

        public UserStatus GetUser(int id)
        {
            var user = Find(id);
            if (user == null)
            {
                return UserStatus.NoSuchUser(id);
            }

            return UserStatus.OK(user);
        }

        public UserStatus FindUser(string username, string password)
        {
            var user = Records.FirstOrDefault(u => u.Username == username && u.Password == password);
            if (user == null)
            {
                return UserStatus.InvalidUsernameOrPassword;
            }

            return UserStatus.OK(user);
        }

        public IEnumerable<User> GetTutors()
        {
            return Records.Where(u => u.Role == Role.Tutor).ToArray();
        }

        public bool MakeTutor(int userId)
        {
            var user = Find(userId);
            user.Role = Role.Tutor;
            Update(user.Id, user);
            int state = SaveChanges();
            return state == 1;
        }
    }
}

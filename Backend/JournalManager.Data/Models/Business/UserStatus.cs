using JournalManager.Data.Constants;
using JournalManager.Data.Models.Data;

namespace JournalManager.Data.Models.Business
{
    public sealed class UserStatus : Status
    {
        public User User { get; set; }

        public static UserStatus OK(User user) => new UserStatus(Strings.OK, user);

        public static UserStatus UserExists(string username) => new UserStatus(Strings.UserExists(username), null);

        public static UserStatus NoSuchUser(int id) => new UserStatus(Strings.NoSuchUser(id), null);

        public static UserStatus InvalidUsernameOrPassword => new UserStatus(Strings.InvalidUsernameOrPassword, null);
        
        private UserStatus(string message, User user)
        {
            Message = message;
            User = user;
        }
    }
}

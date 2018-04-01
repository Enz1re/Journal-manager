using System.Linq;
using JournalManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace JournalManager.Controllers
{
    [Produces("application/json")]
    [Route("[controller]/[action]")]
    public class AuthController : Controller
    {
        private DataContext _db;

        public AuthController(DataContext context)
        {
            _db = context;
        }

        [HttpGet]
        [Route("{login}/{password}")]
        public IActionResult Login(string login,string password)
        {
            if (!_db.Users.Any(u => u.Login == login))
            {
                return BadRequest("No such user");
            }
            if (_db.Users.Any(u => u.Login == login && u.Password != password))
            {
                return BadRequest("Wrong password");
            }
            return Ok(_db.Users.Single(u => u.Login == login && u.Password == password).GetToken());
        }

        [HttpGet]
        [Route("{firstname}/{secondname}/{patronymic}/{login}/{password}")]
        public IActionResult Register(string firstname,string secondname,string patronymic, string login , string password )
        {
            if (_db.Users.Any(u => u.Login == login))
            {
                return BadRequest("User with such login already exist");
            }
            var user = new User
            {
                Login = login,
                Password = password,
                FirstName = firstname,
                SecondName = secondname,
                Patronymic = patronymic
            };
            _db.Users.Add(user);
            _db.SaveChanges();
            return Ok(user.GetToken());
        }
    }
}
using System;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Data;
using JournalManager.Data.Constants;
using Microsoft.AspNetCore.Mvc;

namespace JournalManager.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        private IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(string username, string password)
        {
            var status = _userRepository.FindUser(username, password);
            if (status.Message != Strings.OK)
            {
                return BadRequest(new { message = status.Message });
            }

            return Ok(new { access_token = Jwt.GenerateToken(username, Enum.GetName(typeof(Role), status.User.Role)) });
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register(string firstname, string secondname, string patronymic, string username, string password)
        {
            var user = new User
            {
                Username = username,
                Password = password,
                FirstName = firstname,
                SecondName = secondname,
                Patronymic = patronymic
            };

            var status = _userRepository.AddUser(user);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok(new { access_token = Jwt.GenerateToken(username, Enum.GetName(typeof(Role), status.User.Role)) });
        }
    }
}
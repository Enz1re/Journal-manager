using System;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Data;
using JournalManager.Data.Constants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace JournalManager.Controllers
{
    public class U
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }

    [Produces("application/json")]
    [Route("api/Auth")]
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private IUserRepository _userRepository;
        private Jwt _jwt;

        public AuthController(IUserRepository userRepository, Jwt jwt)
        {
            _userRepository = userRepository;
            _jwt = jwt;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody]U obj)
        {
            var status = _userRepository.FindUser(obj.Username, obj.Password);
            if (status.Message != Strings.OK)
            {
                return BadRequest(new { message = status.Message });
            }

            return Ok(new { access_token = _jwt.GenerateToken(obj.Username, Enum.GetName(typeof(Role), status.User.Role)) });
        }

        [HttpPost]
        [Route("Register")]
        [AllowAnonymous]
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

            return Ok(new { access_token = _jwt.GenerateToken(username, Enum.GetName(typeof(Role), status.User.Role)) });
        }
    }
}
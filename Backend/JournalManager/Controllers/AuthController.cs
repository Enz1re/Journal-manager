using System;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Data;
using JournalManager.Data.Constants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using JournalManager.Data.Models.Request;
using System.Net;

namespace JournalManager.Controllers
{
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
        public IActionResult Login([FromBody]LoginRequestModel login)
        {
            var status = _userRepository.FindUser(login.Username, login.Password);
            if (status.Message != Strings.OK)
            {
                return StatusCode(403, new { message = status.Message });
            }

            string role = Enum.GetName(typeof(Role), status.User.Role);

            return Ok(new { access_token = _jwt.GenerateToken(login.Username, role), user = status.User });
        }

        [HttpPost]
        [Route("Register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody]RegisterRequestModel register)
        {
            var user = new User
            {
                Username = register.Username,
                Password = register.Password,
                FirstName = register.FirstName,
                SecondName = register.SecondName,
                Patronymic = register.Patronymic,
                Role = Role.User
            };

            var status = _userRepository.AddUser(user);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok(new { access_token = _jwt.GenerateToken(register.Username, Enum.GetName(typeof(Role), Role.User)), user });
        }
    }
}
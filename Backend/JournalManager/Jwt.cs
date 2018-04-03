using JournalManager.Data.Models.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JournalManager
{
    public class Jwt
    {
        private JwtConfig _config;

        public Jwt(JwtConfig config)
        {
            _config = config;
        }

        public string GenerateToken(string username, string userRole)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, userRole)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer: _config.Issuer,
                                             audience: _config.Audience,
                                             claims: claims,
                                             expires: DateTime.UtcNow.AddYears(1),
                                             signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using indecisive_decider.Entities;
using Microsoft.IdentityModel.Tokens;

namespace indecisive_decider.Util
{
    public static class JwtHelper
    {
        public static string SigningKey { get; private set; } = "badkeyreplacemeiuwhegrthuigertwghujefhuigefdhiujgehuiergguerhergiuhgerbui";

        public static SymmetricSecurityKey GetKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SigningKey));
        }

        public static JwtSecurityToken GenerateToken(ApplicationUser user)
        {
            var expiry = (int)(DateTime.UtcNow.AddMinutes(60) - DateTime.UnixEpoch).TotalSeconds;
            //https://jwt.io/)
            var securityKey = JwtHelper.GetKey();
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(signingCredentials);
            var payload = new JwtPayload
            {
                { "sub", "api" },
                { "name", $"{user.UserName}" },
                { "exp", expiry },
                { "iss", GetIssuer() },
                { "aud", GetAudience() }
            };
            var token = new JwtSecurityToken(header, payload);
            return token;
        }

        public static string GetIssuer()
        {
            return "http://localhost";
        }

        public static string GetAudience()
        {
            return "http://localhost";
        }

    }
}
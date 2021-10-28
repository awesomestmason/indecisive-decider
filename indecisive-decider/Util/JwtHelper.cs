using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using indecisive_decider.Entities;
using Microsoft.AspNetCore.Identity;
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
            //https://jwt.io/
            var securityKey = GetKey();
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = GetValidClaims(user);
            var token = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials);
            return token;
        }

        private static List<Claim> GetValidClaims(ApplicationUser user)
        {
            var expiry = (int)(DateTime.UtcNow.AddMinutes(60) - DateTime.UnixEpoch).TotalSeconds;
            IdentityOptions _options = new IdentityOptions();
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Iss, GetIssuer()),
                new Claim(JwtRegisteredClaimNames.Aud, GetAudience()),
                new Claim(JwtRegisteredClaimNames.Exp, expiry.ToString(), ClaimValueTypes.Integer64),
                new Claim(_options.ClaimsIdentity.UserIdClaimType, user.Id),
                new Claim(_options.ClaimsIdentity.UserNameClaimType, user.UserName)
            };
            return claims;
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
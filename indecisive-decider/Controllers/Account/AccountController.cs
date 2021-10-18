using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using indecisive_decider.Controllers.Account;
using indecisive_decider.Entities;
using indecisive_decider.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace indecisive_decider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<AccountController> _logger;

        public AccountController(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger)
        {
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> GetAuthToken(LoginRequest loginRequest)
        {
            var result = await _signInManager.PasswordSignInAsync(
                loginRequest.Email,
                loginRequest.Password,
                false,
                false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(loginRequest.Email);
                var token = JwtHelper.GenerateToken(user);
                var handler = new JwtSecurityTokenHandler();
                var tokenString = handler.WriteToken(token);

                return Ok(tokenString);
            }

            return BadRequest("Invalid login details");
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterRequest registerRequest)
        {
            var result = await _userManager.CreateAsync(registerRequest.User, registerRequest.Password);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(registerRequest.User.UserName);
                var token = JwtHelper.GenerateToken(user);
                var handler = new JwtSecurityTokenHandler();
                var tokenString = handler.WriteToken(token);
                return Ok(tokenString);
            }

            return BadRequest(result.Errors.Select(e => e.Description));
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using indecisive_decider.Controllers.Account;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;
using indecisive_decider.Services;
using indecisive_decider.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;

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
        private readonly IMapper _mapper;
        private readonly UserService _userService;

        public AccountController(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger, 
            IMapper mapper,
            UserService userService)
        {
            _configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("login")]
        [SwaggerOperation(
            Summary = "Generates a JWT token for a user",
            Description = "Generates a JWT token for a user",
            OperationId = "account.login",
            Tags = new[] { "AccountEndpoints" })
        ]
        public async Task<ActionResult<LoginResponse>> GetAuthToken(LoginRequest loginRequest)
        {   
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);
            if (user == null)
            {
                return BadRequest("No user by that email");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(
                user,
                loginRequest.Password,
                false);

            if (result.Succeeded)
            {
                var token = JwtHelper.GenerateToken(user);
                var handler = new JwtSecurityTokenHandler();
                var tokenString = handler.WriteToken(token);
                var response = new LoginResponse()
                {
                    JwtToken = tokenString,
                    User = _mapper.Map<UserDto>(user)
                };
                return Ok(response);
            }
            return BadRequest("Invalid login details");
        }

        [HttpPost("register")]
        [SwaggerOperation(
            Summary = "Registers a user",
            Description = "Registers a user",
            OperationId = "account.register",
            Tags = new[] { "AccountEndpoints" })
        ]
        public async Task<ActionResult<LoginResponse>> RegisterUser(RegisterRequest registerRequest)
        {
            ApplicationUser tempUser = new ApplicationUser
            {
                Email = registerRequest.User.Email, UserName = registerRequest.User.Username
            };
            var result = await _userManager.CreateAsync(tempUser, registerRequest.Password);
            
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(registerRequest.User.Username);
                var token = JwtHelper.GenerateToken(user);
                var handler = new JwtSecurityTokenHandler();
                var tokenString = handler.WriteToken(token);
                var response = new LoginResponse()
                {
                    JwtToken = tokenString,
                    User = _mapper.Map<UserDto>(user)
                };
                return Ok(response);
            }

            return BadRequest(result.Errors.Select(e => e.Description));
        }


        [HttpGet]
        [SwaggerOperation(
            Summary = "Lists all registered users",
            Description = "Lists all registered users",
            OperationId = "account.list",
            Tags = new[] { "AccountEndpoints" })
        ]
        public async Task<IEnumerable<UserDto>> ListUsers()
        {
            return (await _userService.GetUsers()).Select(e => _mapper.Map<UserDto>(e));
        }
    }
}

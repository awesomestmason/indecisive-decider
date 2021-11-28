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
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using indecisive_decider.Interfaces;
/// <summary>
/// Space for readonly items within public class.
/// </summary>
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
        private readonly IUserService _userService;

        public AccountController(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger, 
            IMapper mapper,
            IUserService userService)
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
        /// <summary>
        /// Gets a Jwt token authenticating the user
        /// </summary>
        /// <param name="loginRequest">Login request data</param>
        /// <returns>Jwt Token and user data</returns>
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
        /// <summary>
        /// This shoud register a user with account information
        /// within the backend.
        /// </summary>
        /// <param name="registerRequest"></param>
        /// <returns>Log in Response or badrequest</returns>
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

        [Authorize]
        [HttpPatch("settings")]
        [SwaggerOperation(
            Summary = "Changes username and email",
            Description = "Changes user settings and login data in settings",
            OperationId = "account.settings",
            Tags = new[] { "AccountEndpoints" })
        ]
        /// <summary>
        /// Makes sure to verify the user and then allow the user to change
        /// and input a new username and email.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>OK</returns>
        public async Task<ActionResult> UpdateUsernameAndEmail(UpdateAccountRequest request)
        {
            var user = await _userService.VerifyUser(User);
            if(user == null){
                return BadRequest("User not found");
            }
            var emailtoken = await _userManager.GenerateChangeEmailTokenAsync(user, request.Email);
            await _userManager.ChangeEmailAsync(user, request.Email, emailtoken);

            await _userManager.SetUserNameAsync(user, request.Username);

            return Ok();
            
        }
        
        [Authorize]
        [HttpPatch("password")]
        [SwaggerOperation(
            Summary = "Changes user Password",
            Description = "Changes user password in settings",
            OperationId = "account.password",
            Tags = new[] { "AccountEndpoints" })
        ]
        /// <summary>
        /// Must verify user and be able to update the user's password
        /// Must confirm old password and new passwords.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>OK or bad request</returns>
        public async Task<ActionResult> UpdateUserPassword(ChangePasswordRequest request)
        {
            var user = await _userService.VerifyUser(User);
            if(user == null){
                return BadRequest("User not found");
            }

            if(request.NewPassword == request.ConfirmNewPassword)
            {
                await _userService.ChangeUserPassword(user.Id, request.OldPassword, request.NewPassword);
                return Ok();
            }
            else{
                return BadRequest("New Password does not match with Confirm Password!");
            }

        }

        [Authorize]
        [HttpGet]
        [SwaggerOperation(
            Summary = "Lists all info of current user",
            Description = "Lists info of current user",
            OperationId = "account.info",
            Tags = new[] { "AccountEndpoints" })
        ]
        /// <summary>
        /// Gets the current users information or the map to the DTO
        /// </summary>
        /// <returns>mapper.Map user dto info</returns>
        public async Task<ActionResult<UserDto>> GetCurrentUserInfo()
        {
            var user = await _userService.VerifyUser(User);
            if(user == null){
                return BadRequest("User not found");
            }
            return _mapper.Map<UserDto>(user);
        }

        [HttpGet("all")]
        [SwaggerOperation(
            Summary = "Lists all registered users",
            Description = "Lists all registered users",
            OperationId = "account.list",
            Tags = new[] { "AccountEndpoints" })
        ]
        /// <summary>
        /// Lists all users that are registered to backend.
        /// </summary>
        /// <returns>userService result of Get</returns>
        public async Task<IEnumerable<UserDto>> ListUsers()
        {
            return (await _userService.GetUsers()).Select(e => _mapper.Map<UserDto>(e));
        }

    
    }
}

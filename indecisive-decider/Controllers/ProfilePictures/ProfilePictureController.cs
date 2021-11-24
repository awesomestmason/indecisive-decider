
using Microsoft.AspNetCore.StaticFiles;
using System.IO;
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
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace indecisive_decider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilePictureController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ProfilePictureController(
            IWebHostEnvironment env,
            IConfiguration configuration,
            IMapper mapper,
            UserService userService)
        {

            _hostingEnvironment = env;
            _configuration = configuration;
            _mapper = mapper;
            _userService = userService;
        }
        [Authorize]
        [HttpPost("upload")]
        [SwaggerOperation(
            Summary = "Uploads a profile picture for the current user",
            Description = "Uploads a profile picture for the current user",
            OperationId = "profilepicture.upload",
            Tags = new[] { "ProfilePictureEndpoints" })
        ]
        public async Task<ActionResult> UploadImage([FromForm] IFormFile myfile)
        {   
            var user = await VerifyUser();
            if(user == null)
            {
                return BadRequest("Invalid user");
            }
            string uploadsFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "images");  
            var uniqueFileName = user.Id;
            Directory.CreateDirectory(uploadsFolder);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName + ".png");
            using (var fileStream = new FileStream(filePath, FileMode.Create))  
            {  
                await myfile.CopyToAsync(fileStream);  
            }
            return Ok();

        }
        [HttpGet("{userId}")]
        [SwaggerOperation(
            Summary = "Gets the profile picture of a user",
            Description = "Gets the profile picture of a user",
            OperationId = "profilepicture.get",
            Tags = new[] { "ProfilePictureEndpoints" })
        ]
        public async Task<ActionResult> GetUserImage(string userId){
            string uploadsFolder = Path.Combine(_hostingEnvironment.ContentRootPath, "images");  
            var uniqueFileName = userId;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName + ".png");
            if(!System.IO.File.Exists(filePath)){
                filePath = Path.Combine(uploadsFolder, "default.png");
            }
            var fileName = System.IO.Path.GetFileName(filePath);
            var content = await System.IO.File.ReadAllBytesAsync(filePath);
            new FileExtensionContentTypeProvider()
                .TryGetContentType(fileName, out string contentType);
            return File(content, contentType, fileName);
        }
        
        private async Task<ApplicationUser> VerifyUser()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userService.GetUserByIdAsync(id);
            return user;
        }   
    }
}

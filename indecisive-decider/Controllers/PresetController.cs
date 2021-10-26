using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;
using indecisive_decider.Services;
using Microsoft.AspNetCore.Authorization;

namespace indecisive_decider.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PresetController : ControllerBase
    {

        private readonly IMapper mapper;
        private readonly PresetService presetService;
        private readonly UserService _userService;

        public PresetController(IMapper mapper, PresetService presetService, UserService userService)
        {
            this.mapper = mapper;
            this.presetService = presetService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<PresetDto>> Get()
        {

            return (await presetService.GetDefaultPresetsAsync()).Select(preset => mapper.Map<PresetDto>(preset));
        }

        [Authorize]
        [HttpGet("custom")]
        public async Task<IActionResult> AuthGet()
        {
            return Ok(User);
        }

        // PUT api/preset
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] PresetDto p)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var preset = mapper.Map<Preset>(p);
            preset.Owner = user;
            await presetService.AddPresetAsync(preset);
            return Ok();
        }

        [HttpGet("init")]
        public async Task AddDefaults()
        {
            Preset p = new Preset()
            {
                Name = "Bread",
                Items = new List<PresetItem>()
                {
                    new PresetItem()
                    {
                        Value = "Ciabatta"
                    },
                    new PresetItem()
                    {
                        Value = "Rye"
                    },
                    new PresetItem()
                    {
                        Value = "Brioche"
                    },
                    new PresetItem()
                    {
                        Value = "Baguette"
                    }

                }
            };

            await presetService.AddPresetAsync(p);
        }
    }
}
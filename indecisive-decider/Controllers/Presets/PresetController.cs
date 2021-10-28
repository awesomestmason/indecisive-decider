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
using Swashbuckle.AspNetCore.Annotations;

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

        [Authorize]
        [HttpPost]
        [SwaggerOperation(
            Summary = "Adds a user preset",
            Description = "Adds a user preset",
            OperationId = "preset.add",
            Tags = new[] { "PresetEndpoints" })
        ]
        public async Task<IActionResult> Put([FromBody] PresetDto p)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var preset = mapper.Map<Preset>(p);
            preset.Owner = user;
            await presetService.AddPresetAsync(preset);
            return Ok();
        }


        [Authorize]
        [HttpGet]
        [SwaggerOperation(
            Summary = "Gets all of a users presets (including defaults)",
            Description = "Gets all of a users presets (including defaults)",
            OperationId = "preset.get",
            Tags = new[] { "PresetEndpoints" })
        ]
        public async Task<ActionResult<IEnumerable<PresetWithIdDto>>> Get()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var presets = (await presetService.GetUserAndDefaultPresetsAsync(user.Id)).Select(preset => mapper.Map<PresetWithIdDto>(preset)).ToList();
            return Ok(presets);
        }

        
        [Authorize]
        [HttpDelete]
        [SwaggerOperation(
            Summary = "Deletes a user preset",
            Description = "Deletes a user preset",
            OperationId = "preset.delete",
            Tags = new[] { "PresetEndpoints" })
        ]
        public async Task<ActionResult> Delete(int presetId)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var preset = await presetService.GetPreset(presetId);
            if (preset == null || preset.Owner?.Id != user.Id)
            {
                return BadRequest("You do not own this preset");
            }
            await presetService.RemovePresetAsync(presetId);
            return Ok();
        }

        [HttpGet("defaults")]
        [SwaggerOperation(
            Summary = "Gets all default presets",
            Description = "Gets all default presets",
            OperationId = "preset.default.get",
            Tags = new[] { "PresetEndpoints" })
        ]
        public async Task<ActionResult<IEnumerable<PresetDto>>> GetDefaults()
        {
            return Ok((await presetService.GetDefaultPresetsAsync()).Select(preset => mapper.Map<PresetWithIdDto>(preset)));
        }
        [HttpPost("defaults")]
        [SwaggerOperation(
            Summary = "Adds default presets",
            Description = "Adds default presets",
            OperationId = "preset.default.add",
            Tags = new[] { "PresetEndpoints" })
        ]
        public async Task<IActionResult> PostPresets([FromBody] List<PresetDto> presets)
        {
            var presetList = presets.Select(p => mapper.Map<Preset>(p));
            await presetService.AddPresetsAsync(presetList);
            return Ok();
        }
        [HttpDelete("defaults")]
        [SwaggerOperation(
            Summary = "Clears all default presets",
            Description = "Clears all default presets",
            OperationId = "preset.default.delete",
            Tags = new[] { "PresetEndpoints" })
        ]
        public async Task<IActionResult> DeletePresets()
        {
            await presetService.RemoveDefaults();
            return Ok();
        }
    }
}
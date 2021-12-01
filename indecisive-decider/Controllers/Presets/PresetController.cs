using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using indecisive_decider.Interfaces;
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
        private readonly IPresetService presetService;
        private readonly IUserService _userService;

        public PresetController(IMapper mapper, IPresetService presetService, IUserService userService)
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
        /// <summary>
        /// Adds a user custom preset into the preset lists.
        /// </summary>
        /// <param name="p"></param>
        /// <returns>bad Request or OK</returns>
        public async Task<IActionResult> Put([FromBody] PresetDto p)
        {
            var user = await _userService.VerifyUser(User);
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
        /// <summary>
        /// Gets all the user presets, even defaults, and presents them.
        /// </summary>
        /// <returns>Return bad Request or OK</returns>
        public async Task<ActionResult<IEnumerable<PresetWithIdDto>>> Get()
        {
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var presets = (await presetService.GetUserAndDefaultPresetsAsync(user.Id)).Select(preset => mapper.Map<PresetWithIdDto>(preset)).ToList();
            return Ok(presets);
        }

        
        [Authorize]
        [HttpDelete("{presetId:int}")]
        [SwaggerOperation(
            Summary = "Deletes a user preset",
            Description = "Deletes a user preset",
            OperationId = "preset.delete",
            Tags = new[] { "PresetEndpoints" })
        ]
        /// <summary>
        /// Deletes a preset made by the user.
        /// </summary>
        /// <param name="presetId"></param>
        /// <returns>Bad request or OK</returns>
        public async Task<ActionResult> Delete(int presetId)
        {
            var user = await _userService.VerifyUser(User);
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
        [Authorize]
        [HttpPatch("{presetId:int}")]
        [SwaggerOperation(
            Summary = "Updates a user preset",
            Description = "Updates a user preset",
            OperationId = "preset.update",
            Tags = new[] { "PresetEndpoints" })
        ]
        /// <summary>
        /// Allows the user to edit the preset.
        /// </summary>
        /// <param name="presetId"></param>
        /// <param name="updatedPreset"></param>
        /// <returns>bad request or OK</returns>
        public async Task<ActionResult> Update(int presetId, PresetDto updatedPreset)
        {
            var user = await _userService.VerifyUser(User);
            if (user == null)
            {
                return BadRequest("Invalid user");
            }
            var preset = await presetService.GetPreset(presetId);
            if (preset == null || preset.Owner?.Id != user.Id)
            {
                return BadRequest("You do not own this preset");
            }
            Preset p = mapper.Map<Preset>(updatedPreset);
            p.Id = presetId;
            await presetService.UpdatePresetAsync(presetId, p.Name, p.Items);
            return Ok();
        }

        [HttpGet("defaults")]
        [SwaggerOperation(
            Summary = "Gets all default presets",
            Description = "Gets all default presets",
            OperationId = "preset.default.get",
            Tags = new[] { "PresetEndpoints" })
        ]
        /// <summary>
        /// This should get the default presets that we created for the user
        /// </summary>
        /// <returns>The created preset default</returns>
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
        /// <summary>
        /// Inserts the default presets for the user.
        /// </summary>
        /// <param name="presets"></param>
        /// <returns>OK</returns>
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
        /// <summary>
        /// deletes all the defaut presets
        /// </summary>
        /// <returns>OK</returns>
        public async Task<IActionResult> DeletePresets()
        {
            await presetService.RemoveDefaults();
            return Ok();
        }
    }
}
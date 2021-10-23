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
        public PresetController(IMapper mapper, PresetService presetService)
        {
            this.mapper = mapper;
            this.presetService = presetService;
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
        [HttpPut]
        public async Task Put([FromBody] Preset p)
        {
            User.FindFirst(ClaimTypes.NameIdentifier);
            //"bananas", "apples", "oranges"
            //Create list
            // => 
            await presetService.AddPresetAsync(p);
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
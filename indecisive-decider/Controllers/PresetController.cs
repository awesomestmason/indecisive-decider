using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using indecisive_decider.Dtos;
using indecisive_decider.Entities;
using indecisive_decider.Services;

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

            await presetService.AddPreset(p);
        }
    }
}
﻿using AutoMapper;
using indecisive_decider.Entities;

namespace indecisive_decider.Dtos
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<PresetDto, Preset>();
            CreateMap<PresetItemDto, PresetItem>();
            CreateMap<Preset, PresetDto>();
            CreateMap<PresetItem, PresetItemDto>();
            CreateMap<ApplicationUser, UserDto>();
        }
    }
}
using AutoMapper;
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
            CreateMap<PresetWithIdDto, Preset>();
            CreateMap<PresetItemWithIdDto, PresetItem>();
            CreateMap<Preset, PresetWithIdDto>()
                .ForMember(p => p.IsDefault, e =>
                {
                    e.MapFrom(source => source.Owner == null);
                });
            CreateMap<PresetItem, PresetItemWithIdDto>();

            CreateMap<ApplicationUser, UserDto>();
        }
    }
}
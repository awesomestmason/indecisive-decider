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

            CreateMap<ApplicationUser, UserDto>()
                .ForMember(u => u.AvatarUrl, e => e.MapFrom(source => $"api/profilepicture/{source.Id}"));

            CreateMap<FeedItem, FeedItemDto>()
                .ForMember(item => item.Username, e => {
                    e.MapFrom(source => source.User.UserName);
                })
                .ForMember(item => item.PresetName, e => {
                    e.MapFrom(source => source.Preset.Name);
                });

            CreateMap<FeedComment, FeedItemCommentDto>();



        }
    }
}
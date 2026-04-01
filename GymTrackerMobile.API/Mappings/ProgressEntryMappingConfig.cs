using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.ProgressEntries.Commands;
using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class ProgressEntryMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<ProgressEntry, ProgressEntryDto>();
            config.NewConfig<CreateProgressEntryCommand, ProgressEntry>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.Exercise);
            config.NewConfig<UpdateProgressEntryCommand, ProgressEntry>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.Exercise);
        }
    }
}

using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.MembershipTypes.Commands;
using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class MembershipTypeMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<MembershipType, MembershipTypeDto>();
            config.NewConfig<CreateMembershipTypeCommand, MembershipType>();
            config.NewConfig<UpdateMembershipTypeCommand, MembershipType>()
                .Ignore(dest => dest.UserMemberships);
        }
    }
}

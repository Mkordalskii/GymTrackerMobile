using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.UserMemberships.Commands;
using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class UserMembershipMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<UserMembership, UserMembershipDto>();
            config.NewConfig<CreateUserMembershipCommand, UserMembership>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.MembershipType);
            config.NewConfig<UpdateUserMembershipCommand, UserMembership>()
                .Ignore(dest => dest.User)
                .Ignore(dest => dest.MembershipType);
        }
    }
}

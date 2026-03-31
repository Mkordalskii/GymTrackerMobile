using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.Users.Commands;
using GymTrackerMobile.API.Features.Users.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class UserMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<User, UserDto>()
                .Map(dest => dest.RoleName, src => src.Role.Name);

            config.NewConfig<CreateUserCommand, User>()
                .Ignore(dest => dest.Role);

            config.NewConfig<UpdateUserCommand, User>()
                .Ignore(dest => dest.Role);
        }
    }
}

using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.Roles.Commands;
using GymTrackerMobile.API.Features.Roles.Dtos;
using Mapster;

namespace GymTrackerMobile.API.Mappings
{
    public class RoleMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Role, RoleDto>();

            config.NewConfig<CreateRoleCommand, Role>();

            config.NewConfig<UpdateRoleCommand, Role>()
                .Ignore(dest => dest.Users); // Ignorujemy mapowanie kolekcji Users, ponieważ nie chcemy, aby podczas aktualizacji roli były modyfikowane powiązane użytkownicy.
        }
    }
}

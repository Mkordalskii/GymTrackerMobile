using GymTrackerMobile.API.Features.Roles.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public record CreateRoleCommand(string Name, string? Description) : IRequest<RoleDto>;
}

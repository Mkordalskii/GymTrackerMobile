using GymTrackerMobile.API.Entities;
using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public record CreateRoleCommand(string Name, string? Description) : IRequest<Role>;
}

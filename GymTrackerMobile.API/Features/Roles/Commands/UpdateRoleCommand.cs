using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public record UpdateRoleCommand(int Id, string Name, string? Description) : IRequest<bool>;
}

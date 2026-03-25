using MediatR;

namespace GymTrackerMobile.API.Features.Roles.Commands
{
    public record DeleteRoleCommand(int Id) : IRequest<bool>;
}

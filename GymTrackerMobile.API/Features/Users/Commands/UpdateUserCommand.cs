using MediatR;

namespace GymTrackerMobile.API.Features.Users.Commands
{
    public record UpdateUserCommand(int Id, string Name, string Email, int RoleId) : IRequest<bool>;
}

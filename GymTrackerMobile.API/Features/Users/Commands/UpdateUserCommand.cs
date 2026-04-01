using MediatR;

namespace GymTrackerMobile.API.Features.Users.Commands
{
    public record UpdateUserCommand(int Id, string Name, string Email, string PasswordHash, int RoleId) : IRequest<bool>;
}

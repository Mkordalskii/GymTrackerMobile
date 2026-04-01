using MediatR;

namespace GymTrackerMobile.API.Features.Users.Commands
{
    public record DeleteUserCommand(int Id) : IRequest<bool>;
}

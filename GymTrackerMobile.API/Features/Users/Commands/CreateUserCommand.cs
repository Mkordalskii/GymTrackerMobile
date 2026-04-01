using GymTrackerMobile.API.Features.Users.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Users.Commands
{
    public record CreateUserCommand(string Name, string Email, string PasswordHash, int RoleId) : IRequest<UserDto>;
}

using GymTrackerMobile.API.Services.Auth.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Services.Auth.Commands
{
    public record RegisterCommand(string Name, string Email, string Password, int RoleId) : IRequest<AuthResponseDto>;
}

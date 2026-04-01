using GymTrackerMobile.API.Services.Auth.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Services.Auth.Commands
{
    public record LoginCommand(string Email, string Password) : IRequest<AuthResponseDto>;
}

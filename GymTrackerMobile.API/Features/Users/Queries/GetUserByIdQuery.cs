using GymTrackerMobile.API.Features.Users.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Users.Queries
{
    public record GetUserByIdQuery(int Id) : IRequest<UserDto?>;
}

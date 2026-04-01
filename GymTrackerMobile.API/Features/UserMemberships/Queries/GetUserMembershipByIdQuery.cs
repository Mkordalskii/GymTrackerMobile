using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.UserMemberships.Queries
{
    public record GetUserMembershipByIdQuery(int Id) : IRequest<UserMembershipDto?>;
}

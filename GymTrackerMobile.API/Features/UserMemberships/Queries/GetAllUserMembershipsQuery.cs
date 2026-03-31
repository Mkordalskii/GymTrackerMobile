using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.UserMemberships.Queries
{
    public record GetAllUserMembershipsQuery : IRequest<IEnumerable<UserMembershipDto>>;
}

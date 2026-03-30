using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.MembershipTypes.Queries
{
    public record GetAllMembershipTypesQuery() : IRequest<IEnumerable<MembershipTypeDto>>;
}

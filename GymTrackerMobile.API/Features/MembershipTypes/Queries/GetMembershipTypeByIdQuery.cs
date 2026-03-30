using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.MembershipTypes.Queries
{
    public record GetMembershipTypeByIdQuery(int Id) : IRequest<MembershipTypeDto?>;
}

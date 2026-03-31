using GymTrackerMobile.API.Features.UserMemberships.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.UserMemberships.Commands
{
    public record CreateUserMembershipCommand(int UserId, int MembershipTypeId, DateTime StartDate, DateTime EndDate, string Status) : IRequest<UserMembershipDto>;
}

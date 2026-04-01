using MediatR;

namespace GymTrackerMobile.API.Features.UserMemberships.Commands
{
    public record UpdateUserMembershipCommand(int Id, int UserId, int MembershipTypeId, DateTime StartDate, DateTime EndDate, string Status) : IRequest<bool>;
}

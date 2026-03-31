using MediatR;

namespace GymTrackerMobile.API.Features.UserMemberships.Commands
{
    public record DeleteUserMembershipCommand(int Id) : IRequest<bool>;
}

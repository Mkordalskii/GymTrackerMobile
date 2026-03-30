using MediatR;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands
{
    public record DeleteMembershipTypeCommand(int Id) : IRequest<bool>;
}

using MediatR;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands
{
    public record UpdateMembershipTypeCommand(int Id, string Name, string? Description) : IRequest<bool>;
}

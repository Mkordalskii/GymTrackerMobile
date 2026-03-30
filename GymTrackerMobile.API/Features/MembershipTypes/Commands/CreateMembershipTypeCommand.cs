using GymTrackerMobile.API.Features.MembershipTypes.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.MembershipTypes.Commands
{
    public record CreateMembershipTypeCommand(string Name, string? Description) : IRequest<MembershipTypeDto>;
}

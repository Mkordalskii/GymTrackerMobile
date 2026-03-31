using MediatR;

namespace GymTrackerMobile.API.Features.ProgressEntries.Commands
{
    public record DeleteProgressEntryCommand(int Id) : IRequest<bool>;
}

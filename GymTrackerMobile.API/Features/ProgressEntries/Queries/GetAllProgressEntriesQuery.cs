using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.ProgressEntries.Queries
{
    public record GetAllProgressEntriesQuery : IRequest<IEnumerable<ProgressEntryDto>>;
}

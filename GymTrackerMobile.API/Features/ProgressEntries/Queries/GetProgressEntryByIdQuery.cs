using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.ProgressEntries.Queries
{
    public record GetProgressEntryByIdQuery(int Id) : IRequest<ProgressEntryDto?>;
}

using GymTrackerMobile.API.Features.ProgressEntries.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.ProgressEntries.Commands
{
    public record CreateProgressEntryCommand(int UserId, int ExerciseId, decimal Weight, int Reps, DateTime CreatedAt, string? Comment) : IRequest<ProgressEntryDto>;
}

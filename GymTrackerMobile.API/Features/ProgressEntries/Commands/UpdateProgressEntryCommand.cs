using MediatR;

namespace GymTrackerMobile.API.Features.ProgressEntries.Commands
{
    public record UpdateProgressEntryCommand(int Id, int UserId, int ExerciseId, decimal Weight, int Reps, DateTime CreatedAt, string? Comment) : IRequest<bool>;
}

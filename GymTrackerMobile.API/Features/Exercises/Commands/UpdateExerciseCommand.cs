using MediatR;

namespace GymTrackerMobile.API.Features.Exercises.Commands
{
    public record UpdateExerciseCommand(
       int Id,
       string Name,
       string? Description,
       string DifficultyLevel,
       int CategoryId
   ) : IRequest<bool>;
}

using GymTrackerMobile.API.Features.Exercises.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Exercises.Commands
{
    public record CreateExerciseCommand(
        string Name,
        string? Description,
        string DifficultyLevel,
        int CategoryId
    ) : IRequest<ExerciseDto>;
}

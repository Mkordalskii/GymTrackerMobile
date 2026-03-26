using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public record CreateExerciseCategoryCommand(string Name, string? Description) : IRequest<ExerciseCategoryDto>;
}

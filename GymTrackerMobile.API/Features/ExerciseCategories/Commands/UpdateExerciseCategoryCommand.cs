using MediatR;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public record UpdateExerciseCategoryCommand(int Id, string Name, string? Description) : IRequest<bool>;
}

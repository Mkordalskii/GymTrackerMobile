using MediatR;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public record DeleteExerciseCategoryCommand(int Id) : IRequest<bool>;
}

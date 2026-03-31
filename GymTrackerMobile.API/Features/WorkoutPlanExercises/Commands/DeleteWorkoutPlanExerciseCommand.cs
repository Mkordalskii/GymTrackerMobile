using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands
{
    public record DeleteWorkoutPlanExerciseCommand(int Id) : IRequest<bool>;
}

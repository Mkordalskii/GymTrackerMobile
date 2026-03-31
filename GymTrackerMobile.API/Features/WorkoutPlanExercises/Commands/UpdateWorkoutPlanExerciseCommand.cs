using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands
{
    public record UpdateWorkoutPlanExerciseCommand(int Id, int WorkoutPlanId, int ExerciseId, int Sets, int Reps, int OrderIndex) : IRequest<bool>;
}

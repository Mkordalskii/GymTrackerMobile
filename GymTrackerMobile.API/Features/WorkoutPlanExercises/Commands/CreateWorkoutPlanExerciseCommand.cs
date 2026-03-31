using GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands
{
    public record CreateWorkoutPlanExerciseCommand(int WorkoutPlanId, int ExerciseId, int Sets, int Reps, int OrderIndex) : IRequest<WorkoutPlanExerciseDto>;
}

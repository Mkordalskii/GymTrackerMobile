using GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Queries
{
    public record GetAllWorkoutPlanExercisesQuery : IRequest<IEnumerable<WorkoutPlanExerciseDto>>;
}

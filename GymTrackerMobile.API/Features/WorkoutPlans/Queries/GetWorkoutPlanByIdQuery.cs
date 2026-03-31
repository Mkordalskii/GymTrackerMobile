using GymTrackerMobile.API.Features.WorkoutPlans.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Queries
{
    public record GetWorkoutPlanByIdQuery(int Id) : IRequest<WorkoutPlanDto?>;
}

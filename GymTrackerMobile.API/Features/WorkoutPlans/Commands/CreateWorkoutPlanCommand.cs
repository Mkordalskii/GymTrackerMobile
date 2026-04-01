using GymTrackerMobile.API.Features.WorkoutPlans.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Commands
{
    public record CreateWorkoutPlanCommand(int UserId, string Name, string? Goal, DateTime CreatedAt) : IRequest<WorkoutPlanDto>;
}

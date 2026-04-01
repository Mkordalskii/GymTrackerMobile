using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Commands
{
    public record UpdateWorkoutPlanCommand(int Id, int UserId, string Name, string? Goal, DateTime CreatedAt) : IRequest<bool>;
}

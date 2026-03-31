using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Commands
{
    public record DeleteWorkoutPlanCommand(int Id) : IRequest<bool>;
}

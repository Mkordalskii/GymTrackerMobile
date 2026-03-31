using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Commands
{
    public record UpdateWorkoutSessionCommand(int Id, int UserId, int WorkoutPlanId, DateTime SessionDate, int DurationMinutes, string? Notes) : IRequest<bool>;
}

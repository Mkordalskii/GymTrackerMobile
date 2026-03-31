using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Commands
{
    public record CreateWorkoutSessionCommand(int UserId, int WorkoutPlanId, DateTime SessionDate, int DurationMinutes, string? Notes) : IRequest<WorkoutSessionDto>;
}

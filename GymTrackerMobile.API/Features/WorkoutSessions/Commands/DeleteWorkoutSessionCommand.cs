using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Commands
{
    public record DeleteWorkoutSessionCommand(int Id) : IRequest<bool>;
}

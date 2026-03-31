using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Queries
{
    public record GetAllWorkoutSessionsQuery : IRequest<IEnumerable<WorkoutSessionDto>>;
}

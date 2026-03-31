using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Queries
{
    public record GetWorkoutSessionByIdQuery(int Id) : IRequest<WorkoutSessionDto?>;
}

using GymTrackerMobile.API.Features.Exercises.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.Exercises.Queries
{
    public record GetExerciseByIdQuery(int Id) : IRequest<ExerciseDto?>;
}

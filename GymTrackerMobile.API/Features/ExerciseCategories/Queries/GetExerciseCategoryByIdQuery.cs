using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using MediatR;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Queries
{
    public record GetExerciseCategoryByIdQuery(int Id) : IRequest<ExerciseCategoryDto?>;
}

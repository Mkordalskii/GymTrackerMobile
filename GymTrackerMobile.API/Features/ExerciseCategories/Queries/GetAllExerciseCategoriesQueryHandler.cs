using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Queries
{
    public class GetAllExerciseCategoriesQueryHandler : IRequestHandler<GetAllExerciseCategoriesQuery, IEnumerable<ExerciseCategoryDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllExerciseCategoriesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExerciseCategoryDto>> Handle(GetAllExerciseCategoriesQuery request, CancellationToken cancellationToken)
        {
            return await _context.ExerciseCategories
                .AsNoTracking()
                .ProjectToType<ExerciseCategoryDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

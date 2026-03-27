using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Queries
{
    public class GetExerciseCategoryByIdQueryHandler : IRequestHandler<GetExerciseCategoryByIdQuery, ExerciseCategoryDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetExerciseCategoryByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<ExerciseCategoryDto?> Handle(GetExerciseCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.ExerciseCategories
                .AsNoTracking()
                .Where(c => c.Id == request.Id)
                .ProjectToType<ExerciseCategoryDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

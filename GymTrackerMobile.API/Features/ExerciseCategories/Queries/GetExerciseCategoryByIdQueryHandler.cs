using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.ExerciseCategories.Dtos;
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
                .Select(c => new ExerciseCategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description
                })
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

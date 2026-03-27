using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.Exercises.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Exercises.Queries
{
    public class GetExerciseByIdQueryHandler : IRequestHandler<GetExerciseByIdQuery, ExerciseDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetExerciseByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<ExerciseDto?> Handle(GetExerciseByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Exercises
                .AsNoTracking()
                .Where(e => e.Id == request.Id)
                .ProjectToType<ExerciseDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

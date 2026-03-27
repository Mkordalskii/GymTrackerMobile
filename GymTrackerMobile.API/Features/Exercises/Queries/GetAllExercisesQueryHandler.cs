using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.Exercises.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Exercises.Queries
{
    public class GetAllExercisesQueryHandler : IRequestHandler<GetAllExercisesQuery, IEnumerable<ExerciseDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllExercisesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExerciseDto>> Handle(GetAllExercisesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Exercises
                .AsNoTracking()
                .ProjectToType<ExerciseDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

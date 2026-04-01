using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Queries
{
    public class GetWorkoutPlanExerciseByIdQueryHandler : IRequestHandler<GetWorkoutPlanExerciseByIdQuery, WorkoutPlanExerciseDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetWorkoutPlanExerciseByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<WorkoutPlanExerciseDto?> Handle(GetWorkoutPlanExerciseByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.WorkoutPlanExercises
                .AsNoTracking()
                .Where(x => x.Id == request.Id)
                .ProjectToType<WorkoutPlanExerciseDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

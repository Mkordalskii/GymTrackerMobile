using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.WorkoutPlanExercises.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Queries
{
    public class GetAllWorkoutPlanExercisesQueryHandler : IRequestHandler<GetAllWorkoutPlanExercisesQuery, IEnumerable<WorkoutPlanExerciseDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllWorkoutPlanExercisesQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WorkoutPlanExerciseDto>> Handle(GetAllWorkoutPlanExercisesQuery request, CancellationToken cancellationToken)
        {
            return await _context.WorkoutPlanExercises
                .AsNoTracking()
                .ProjectToType<WorkoutPlanExerciseDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

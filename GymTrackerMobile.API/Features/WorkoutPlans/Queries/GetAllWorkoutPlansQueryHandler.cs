using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.WorkoutPlans.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Queries
{
    public class GetAllWorkoutPlansQueryHandler : IRequestHandler<GetAllWorkoutPlansQuery, IEnumerable<WorkoutPlanDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllWorkoutPlansQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WorkoutPlanDto>> Handle(GetAllWorkoutPlansQuery request, CancellationToken cancellationToken)
        {
            return await _context.WorkoutPlans
                .AsNoTracking()
                .ProjectToType<WorkoutPlanDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

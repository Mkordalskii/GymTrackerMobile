using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.WorkoutPlans.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Queries
{
    public class GetWorkoutPlanByIdQueryHandler : IRequestHandler<GetWorkoutPlanByIdQuery, WorkoutPlanDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetWorkoutPlanByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<WorkoutPlanDto?> Handle(GetWorkoutPlanByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.WorkoutPlans
                .AsNoTracking()
                .Where(x => x.Id == request.Id)
                .ProjectToType<WorkoutPlanDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

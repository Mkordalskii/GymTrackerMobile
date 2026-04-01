using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Queries
{
    public class GetAllWorkoutSessionsQueryHandler : IRequestHandler<GetAllWorkoutSessionsQuery, IEnumerable<WorkoutSessionDto>>
    {
        private readonly GymTrackerDbContext _context;

        public GetAllWorkoutSessionsQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WorkoutSessionDto>> Handle(GetAllWorkoutSessionsQuery request, CancellationToken cancellationToken)
        {
            return await _context.WorkoutSessions
                .AsNoTracking()
                .ProjectToType<WorkoutSessionDto>()
                .ToListAsync(cancellationToken);
        }
    }
}

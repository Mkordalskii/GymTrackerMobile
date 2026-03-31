using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Queries
{
    public class GetWorkoutSessionByIdQueryHandler : IRequestHandler<GetWorkoutSessionByIdQuery, WorkoutSessionDto?>
    {
        private readonly GymTrackerDbContext _context;

        public GetWorkoutSessionByIdQueryHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<WorkoutSessionDto?> Handle(GetWorkoutSessionByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.WorkoutSessions
                .AsNoTracking()
                .Where(x => x.Id == request.Id)
                .ProjectToType<WorkoutSessionDto>()
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}

using GymTrackerMobile.API.Data;
using GymTrackerMobile.API.Entities;
using GymTrackerMobile.API.Features.WorkoutSessions.Dtos;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Commands
{
    public class CreateWorkoutSessionCommandHandler : IRequestHandler<CreateWorkoutSessionCommand, WorkoutSessionDto>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public CreateWorkoutSessionCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<WorkoutSessionDto> Handle(CreateWorkoutSessionCommand request, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId, cancellationToken);
            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");
            var workoutPlanExists = await _context.WorkoutPlans.AnyAsync(wp => wp.Id == request.WorkoutPlanId, cancellationToken);
            if (!workoutPlanExists)
                throw new ArgumentException("Selected workout plan does not exist.");

            var entity = _mapper.Map<WorkoutSession>(request);
            _context.WorkoutSessions.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return await _context.WorkoutSessions
                .AsNoTracking()
                .Where(x => x.Id == entity.Id)
                .ProjectToType<WorkoutSessionDto>()
                .FirstAsync(cancellationToken);
        }
    }
}

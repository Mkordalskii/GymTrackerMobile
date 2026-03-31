using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Commands
{
    public class UpdateWorkoutSessionCommandHandler : IRequestHandler<UpdateWorkoutSessionCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateWorkoutSessionCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateWorkoutSessionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.WorkoutSessions
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId, cancellationToken);
            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");
            var workoutPlanExists = await _context.WorkoutPlans.AnyAsync(wp => wp.Id == request.WorkoutPlanId, cancellationToken);
            if (!workoutPlanExists)
                throw new ArgumentException("Selected workout plan does not exist.");

            _mapper.Map(request, entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

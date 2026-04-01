using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Commands
{
    public class UpdateWorkoutPlanCommandHandler : IRequestHandler<UpdateWorkoutPlanCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateWorkoutPlanCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateWorkoutPlanCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.WorkoutPlans
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            var userExists = await _context.Users
                .AnyAsync(u => u.Id == request.UserId, cancellationToken);

            if (!userExists)
                throw new ArgumentException("Selected user does not exist.");

            _mapper.Map(request, entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

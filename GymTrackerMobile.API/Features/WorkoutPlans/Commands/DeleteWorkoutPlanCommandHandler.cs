using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlans.Commands
{
    public class DeleteWorkoutPlanCommandHandler : IRequestHandler<DeleteWorkoutPlanCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteWorkoutPlanCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteWorkoutPlanCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.WorkoutPlans
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            _context.WorkoutPlans.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

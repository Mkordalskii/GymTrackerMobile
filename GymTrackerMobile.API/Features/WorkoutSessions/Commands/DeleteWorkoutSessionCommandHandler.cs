using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutSessions.Commands
{
    public class DeleteWorkoutSessionCommandHandler : IRequestHandler<DeleteWorkoutSessionCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteWorkoutSessionCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteWorkoutSessionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.WorkoutSessions
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            _context.WorkoutSessions.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

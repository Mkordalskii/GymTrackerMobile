using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.WorkoutPlanExercises.Commands
{
    public class DeleteWorkoutPlanExerciseCommandHandler : IRequestHandler<DeleteWorkoutPlanExerciseCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteWorkoutPlanExerciseCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteWorkoutPlanExerciseCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.WorkoutPlanExercises
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity is null)
                return false;

            _context.WorkoutPlanExercises.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

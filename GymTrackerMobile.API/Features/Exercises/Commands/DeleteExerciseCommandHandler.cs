using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Exercises.Commands
{
    public class DeleteExerciseCommandHandler : IRequestHandler<DeleteExerciseCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteExerciseCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteExerciseCommand request, CancellationToken cancellationToken)
        {
            var exercise = await _context.Exercises
                .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

            if (exercise is null)
                return false;

            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

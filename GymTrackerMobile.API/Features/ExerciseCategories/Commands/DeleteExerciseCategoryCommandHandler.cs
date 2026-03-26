using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public class DeleteExerciseCategoryCommandHandler : IRequestHandler<DeleteExerciseCategoryCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public DeleteExerciseCategoryCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteExerciseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.ExerciseCategories.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
            if (category == null) return false;
            _context.ExerciseCategories.Remove(category);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

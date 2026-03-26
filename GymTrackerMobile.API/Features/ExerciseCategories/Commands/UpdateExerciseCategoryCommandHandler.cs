using GymTrackerMobile.API.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.ExerciseCategories.Commands
{
    public class UpdateExerciseCategoryCommandHandler : IRequestHandler<UpdateExerciseCategoryCommand, bool>
    {
        private readonly GymTrackerDbContext _context;

        public UpdateExerciseCategoryCommandHandler(GymTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateExerciseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.ExerciseCategories.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (category == null) return false;

            category.Name = request.Name;
            category.Description = request.Description;

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}

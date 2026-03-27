using GymTrackerMobile.API.Data;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Features.Exercises.Commands
{
    public class UpdateExerciseCommandHandler : IRequestHandler<UpdateExerciseCommand, bool>
    {
        private readonly GymTrackerDbContext _context;
        private readonly IMapper _mapper;

        public UpdateExerciseCommandHandler(GymTrackerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(UpdateExerciseCommand request, CancellationToken cancellationToken)
        {
            var exercise = await _context.Exercises
                .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

            if (exercise is null)
                return false;

            var categoryExists = await _context.ExerciseCategories
                .AnyAsync(c => c.Id == request.CategoryId, cancellationToken);

            if (!categoryExists)
                throw new ArgumentException("Selected category does not exist.");

            _mapper.Map(request, exercise);

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
